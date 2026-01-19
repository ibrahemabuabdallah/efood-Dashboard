import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  addresses: [{
    city: { type: String, required: true },
    area: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String },
    apartment: { type: String },
    isDefault: { type: Boolean, default: false }
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  verificationCode: {
    type: String,
    select: false
  },
  codeExpiry: {
    type: Date,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Set default address
userSchema.methods.setDefaultAddress = function(addressId) {
  this.addresses.forEach(addr => {
    addr.isDefault = addr._id.toString() === addressId.toString()
  })
  return this.save()
}

const User = mongoose.model('User', userSchema)

export default User
