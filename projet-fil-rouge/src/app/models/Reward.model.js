import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameSlug: {
    type: String,
    required: true,
  },
  milestone: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Reward || mongoose.model('Reward', rewardSchema);