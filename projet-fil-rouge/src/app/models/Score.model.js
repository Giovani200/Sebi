import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    achievedAt: {
        type: Date,
        default: Date.now,
    },

})

export default mongoose.models.Score || mongoose.model('Score', scoreSchema);