import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { jest } from '@jest/globals'

// Increase default Jest timeout; MongoMemoryServer download/start can be slow on Windows first run
jest.setTimeout(30000)

let mongo

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  // Use a stable dbName to keep things simple
  await mongoose.connect(uri, { dbName: 'jest' })
})

afterEach(async () => {
  // Clean all collections between tests
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }
  if (mongo) {
    await mongo.stop()
  }
})
