// import dotenv from 'dotenv'
// dotenv.config()

import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

await initDatabase()

const post = new Post({
  title: 'Hello Mongoose2!',
  author: 'Daniel Bugl 2',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

const createdPost = await post.save()
console.log('Created post:', createdPost)

await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello again, Mongoose 2!' },
})

const posts = await Post.find()
console.log('All posts:', posts)

process.exit(0)