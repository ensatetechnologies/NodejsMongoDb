import mongoose from 'mongoose'
import { describe, expect, test, beforeAll, afterEach, afterAll } from '@jest/globals'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'
import { initDatabase, closeDatabase } from '../db/init.js'

// Connect to the real database specified by process.env.DATABASE_URL (or fallback in init.js)
beforeAll(async () => {
  await initDatabase()
})

// Clean up data between tests to avoid cross-test pollution
afterEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

// Close the DB connection when the suite finishes
afterAll(async () => {
  await closeDatabase()
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: 'Daniel Bugl',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const post = {
      author: 'Daniel Bugl',
      contents: 'Post with no title',
      tags: ['empty'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})
