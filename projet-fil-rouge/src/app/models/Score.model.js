import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameSlug: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Index pour les performances
scoreSchema.index({ userId: 1, gameSlug: 1 });
scoreSchema.index({ score: -1 });
scoreSchema.index({ createdAt: -1 });

const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);

export default Score;