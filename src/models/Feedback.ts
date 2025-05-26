import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: 100,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
