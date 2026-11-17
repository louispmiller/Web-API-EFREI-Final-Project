// Copied and edited from the original version of previous api exercise

import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  organiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  questions: [{
    question: String,
    answers: [{
      answer: String
    }],
    responses: [{
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      answer: {
        type: mongoose.Schema.Types.ObjectId
      }
    }]
  }]
}, {
  collection: 'polls',
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
