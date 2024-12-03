const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }], // Reference to Permission model
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', roleSchema);
