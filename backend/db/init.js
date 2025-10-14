import mongoose from 'mongoose'

export function initDatabase() {
  const DATABASE_URL = 'mongodb://127.0.0.1:27017/blog'//process.env.DATABASE_URL
  mongoose.connection.on('open', () => {
    console.info('successfully connected to database:', DATABASE_URL)
  })
  const connection = mongoose.connect(DATABASE_URL)
  return connection
}