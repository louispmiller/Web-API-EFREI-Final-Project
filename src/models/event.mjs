// Copied and edited from the original version of previous api exercise

import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  coverPhoto: String,
  visibility: {
    type: String,
    enum: ['public', 'private']
  },
  organisers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  },
  shoppingListEnabled: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'events',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;

    delete retUpdated._id;
    return retUpdated;
  }
});

export default Schema;
