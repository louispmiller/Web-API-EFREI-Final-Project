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
  name: String,
  amount: Number,
  quantity: Number,
  purchases: [{
    firstname: String,
    lastname: String,
    address: String,
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  collection: 'tickets',
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
