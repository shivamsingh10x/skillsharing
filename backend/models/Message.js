const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    courseTitle: { type: String },
    message: { type: String, required: true },
    reply: { type: String },
    repliedAt: { type: Date },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    category: { type: String, enum: ['doubt', 'feedback', 'complaint', 'general'], default: 'general' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  { timestamps: true }
);

// Index for faster queries
messageSchema.index({ mentorId: 1, isRead: 1 });
messageSchema.index({ studentId: 1 });
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
