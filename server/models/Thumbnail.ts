import mongoose, { Document } from 'mongoose';

export interface IThumbnail extends Document {
    userId: string;
    createdBy: string;
    videoTopic: string;
    platform: 'youtube' | 'instagram' | string;
    aspectRatio?: string;
    videoLength?: string;
    contentGoal?: string;
    additionalDetails?: string;
    generatedContent: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}

const ThumbnailSchema = new mongoose.Schema<IThumbnail>(
    {
        userId: { type: String, ref: 'User', required: true },
        createdBy: { type: String, ref: 'User', required: true },
        videoTopic: { type: String, required: true, trim: true },
        platform: { type: String, required: true, enum: ['youtube', 'instagram'] },
        aspectRatio: { type: String, default: '' },
        videoLength: { type: String, default: '' },
        contentGoal: { type: String, default: '' },
        additionalDetails: { type: String, default: '' },
        generatedContent : {type : mongoose.Schema.Types.Mixed , required : true }
    },
    {
        timestamps: true
    }
);

const Thumbnail = mongoose.models.Thumbnail || mongoose.model<IThumbnail>('Thumbnail', ThumbnailSchema);

export default Thumbnail;