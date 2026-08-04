import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import ai from '../config/ai..js';
import { buildPromptForPlatform, GenerateContentInput } from '../helpers/promptBuilder.js';

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. User session not found.' });
        }

        const { videoTopic, platform, aspectRatio, videoLength, contentGoal, additionalDetails } = req.body;

        // Input validation
        if (!videoTopic || typeof videoTopic !== 'string' || !videoTopic.trim()) {
            return res.status(400).json({ message: 'VideoTopic is required.' });
        }

        // Normalize platform to lowercase ('youtube' or 'instagram')
        const normalizedPlatform = (platform || 'youtube').toString().toLowerCase().trim();

        const inputData: GenerateContentInput = {
            videoTopic: videoTopic.trim(),
            platform: normalizedPlatform,
            aspectRatio: aspectRatio || (normalizedPlatform === 'instagram' ? '9:16' : '16:9'),
            videoLength: videoLength || '',
            contentGoal: contentGoal || '',
            additionalDetails: additionalDetails || ''
        };

        console.log('[Generate] Input:', JSON.stringify(inputData));

        // Build the prompt
        const prompt = buildPromptForPlatform(inputData);

        console.log('[Generate] Prompt first 120 chars:', prompt.slice(0, 120));

        // Call Gemini with a fresh client instance to avoid implicit caching
        // Creating a new GoogleGenAI instance per request ensures no shared state
        const { GoogleGenAI } = await import('@google/genai');
        const freshAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

        const aiResponse: any = await freshAi.models.generateContent({
            model: 'gemini-flash-latest',
            contents: [prompt],
            config: {
                responseMimeType: 'application/json',
                temperature: 0.9
            }
        });

        const rawText = aiResponse.text || aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            throw new Error('Failed to retrieve content from Gemini AI.');
        }

        console.log('[Generate] Gemini raw response (first 200 chars):', rawText.slice(0, 200));

        // Clean any potential markdown wrapping and parse JSON
        const cleanedJsonText = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        let generatedContent: Record<string, any>;

        try {
            generatedContent = JSON.parse(cleanedJsonText);
        } catch (jsonErr) {
            console.error('[Generate] JSON parse error. Raw text:', rawText);
            throw new Error('Gemini response was not valid JSON');
        }

        // Log the key fields to verify uniqueness
        console.log('[Generate] Generated titles/title:',
            generatedContent.youtubeTitles?.[0] || generatedContent.reelTitle || 'N/A'
        );

        const videoRecord = await Thumbnail.create({
            userId,
            createdBy: userId,
            videoTopic: inputData.videoTopic,
            platform: normalizedPlatform,
            aspectRatio: inputData.aspectRatio,
            videoLength: inputData.videoLength,
            contentGoal: inputData.contentGoal,
            additionalDetails: inputData.additionalDetails,
            generatedContent
        });

        console.log('[Generate] DB record created:', videoRecord._id);

        return res.status(201).json({
            message: 'Content pack generated successfully',
            videoRecord
        });
    } catch (error: any) {
        console.error('[Generate] Error:', error.message || error);

        const status =
            error.status ||
            error.code ||
            error.response?.status ||
            500;

        return res.status(status).json({
            message: error.message,
            details: error.error || error.response?.data
        });
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