import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 4,
    max: 120,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  parentEmail: {
    type: String,
    required: function () {
      return this.age < 13;
    },
    lowercase: true,
  },
  isParentApproved: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

