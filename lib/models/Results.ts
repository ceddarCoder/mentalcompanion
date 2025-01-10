// lib/models/Result.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
    sessionId: mongoose.Schema.Types.ObjectId; // Reference to FuzzingSession
    vulnerabilityType: string;
    severity: string; // e.g., "low", "medium", "high", "critical"
    description: string;
    recommendation: string;
    timestamp: Date;
}

const ResultSchema: Schema<IResult> = new Schema({
    sessionId: { type: Schema.Types.ObjectId, required: true, ref: 'FuzzingSession' },
    vulnerabilityType: { type: String, required: true },
    severity: { type: String, required: true },
    description: { type: String, required: true },
    recommendation: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const ResultModel = mongoose.models.Result || mongoose.model<IResult>('Result', ResultSchema);

export default ResultModel;
