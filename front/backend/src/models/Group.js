import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true, unique: true },
    avatarUrl: { type: String, default: '' },
    adminIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    memberCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Group = mongoose.model('Group', groupSchema);
