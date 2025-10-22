import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    contents: { type: String },
    tags: [String],
  },
  { timestamps: true }
)

export const Post = mongoose.model('Post', postSchema)
