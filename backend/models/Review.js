import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Update product rating when review is created/updated/deleted
reviewSchema.statics.updateProductRating = async function(productId) {
  const reviews = await this.find({ product: productId })
  if (reviews.length === 0) {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      rating: 0,
      reviewsCount: 0
    })
    return
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length

  await mongoose.model('Product').findByIdAndUpdate(productId, {
    rating: Math.round(averageRating * 10) / 10,
    reviewsCount: reviews.length
  })
}

reviewSchema.post('save', async function() {
  await this.constructor.updateProductRating(this.product)
})

reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await doc.constructor.updateProductRating(doc.product)
  }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
