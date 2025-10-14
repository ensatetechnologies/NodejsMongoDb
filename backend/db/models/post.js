import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    contents: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
)

export const Post = mongoose.model('Post', postSchema)
