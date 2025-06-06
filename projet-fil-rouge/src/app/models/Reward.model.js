import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  milestone: {
    type: Number,
    required: true
  },
  gameSlug: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Nouvelle récompense'
  },
  description: {
    type: String,
    default: 'Félicitations pour ton accomplissement!'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  viewed: {
    type: Boolean,
    default: false
  }
});

// Création d'un index composé pour garantir l'unicité
RewardSchema.index({ userId: 1, milestone: 1, gameSlug: 1 }, { unique: true });

export default mongoose.models.Reward || mongoose.model('Reward', RewardSchema);