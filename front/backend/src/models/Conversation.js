import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['direct', 'group'], required: true, index: true },
    title: { type: String, default: '' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
    lastMessageAt: { type: Date, default: null },
    lastMessagePreview: { type: String, default: '' }
  },
  { timestamps: true }
);

conversationSchema.index({ members: 1, type: 1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);
