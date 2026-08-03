import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import ai from '../config/ai..js';
import { buildPromptForPlatform, GenerateContentInput } from '../helpers/promptBuilder.js';
import { json } from 'node:stream/consumers';

export const generateThumbnail = async (req: Request, res: Response) => {
    try{

        const {userId} = req.session;
        if(!userId){
            return res.status(401).json({ message : 'Unauthorized. User session not found.' });
        }

        const { videoTopic , platform , aspectRatio , videoLength , contentGoal , additionalDetails} = req.body;

        //input validation
        if(!videoTopic || typeof videoTopic !== 'string' || !videoTopic.trim()){
            return res.status(400).json({message : 'VideoTopic is required.'});
        }

        const inputData : GenerateContentInput = {
                videoTopic : videoTopic.trim(),
                platform : platform,
                aspectRatio : aspectRatio || (platform === 'instagram' ? '9:16' : '16:9'),
                videoLength : videoLength || "",
                contentGoal : contentGoal || '',
                additionalDetails : additionalDetails || ''
        };

         // Construct dynamic platform-specific Gemini prompt
         const prompt = buildPromptForPlatform(inputData);

         // Call Gemini Text Model  
         const modelName = 'gemini-flash-latest';

         const aiResponse : any = await ai.models.generateContent({
            model : modelName,
            contents : [prompt],
            config : {
                responseMimeType : 'application/json',
                temperature : 0.7
            }
         });

          const rawText = aiResponse.text || aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            throw new Error('Failed to retrieve content from Gemini AI.');
        }

        
        // Clean any potential markdown wrapping and parse JSON
        const cleanedJsonText = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        let generatedContent: Record<string, any>;

        try{
            generatedContent = JSON.parse(cleanedJsonText);
        } catch (jsonErr){
            console.error("Error parsing JSON from Gemini Response :"  , rawText);
            throw new Error('Gemini response was not valid Json');
        }
         
        const videoRecord = await  Thumbnail.create({
            userId,
            createdBy : userId,
            videoTopic : inputData.videoTopic,
            platform : inputData.platform,
            aspectRatio : inputData.aspectRatio,
            videoLength : inputData.videoLength ,
            contentGoal : inputData.contentGoal ,
            additionalDetails : inputData.additionalDetails,
            generatedContent
        })

        return res.status(201).json({
            message : 'Content pack generated successfully',
            videoRecord : videoRecord
        })
    }
    catch (error: any) {
        console.error('Error in generateThumbnail controller:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. User session not found.' });
        }

        const deletedItem = await Thumbnail.findOneAndDelete({
            _id: id,
            $or: [{ userId }, { createdBy: userId }]
        });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found or unauthorized' });
        }

        return res.json({ message: 'Content deleted successfully' });
    } catch (error: any) {
        console.error('Error in deleteThumbnail controller:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};