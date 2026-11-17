import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  coverPhoto: String,
  type: {
    type: String,
    enum: ['public', 'private', 'secret']
  },
  allowMemberPosts: {
    type: Boolean,
    default: true
  },
  allowMemberEvents: {
    type: Boolean,
    default: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  administrators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  collection: 'groups',
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