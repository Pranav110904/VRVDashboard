const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  createdDate: 
  { 
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Permission', permissionSchema);
