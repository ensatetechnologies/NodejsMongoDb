import 'dotenv/config'
import mongoose from 'mongoose'

export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/blog'
  mongoose.connection.on('open', () => {
    console.info('successfully connected to database:', DATABASE_URL)
  })
  return mongoose.connect(DATABASE_URL)
}

export async function closeDatabase() {
  if (mongoose.connection.readyState) {
    await mongoose.connection.close()
  }
}