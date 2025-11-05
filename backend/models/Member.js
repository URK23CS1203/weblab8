const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  phone: { type: String, trim: true },
  membershipType: { type: String, enum: ['monthly','quarterly','yearly','trial'], default: 'monthly' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);
