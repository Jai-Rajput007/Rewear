const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwapSchema = new Schema({
  itemRequested: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Swap', SwapSchema);
