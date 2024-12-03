const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  role: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true 
  }, 
  status: { 
    type: Boolean, 
    default: true 
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);
