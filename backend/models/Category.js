import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  nameAr: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  icon: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category
