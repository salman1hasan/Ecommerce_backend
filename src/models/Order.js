const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: { type: String, default: 'pending' }, // pending, completed, cancelled
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
