import { MongoClient } from 'mongodb'
import { readFile } from 'node:fs/promises'

const url = 'mongodb://localhost:27017/'
const dbName = 'mongotest'
const client = new MongoClient(url)

try {
    await client.connect()
    console.log('Connected to MongoDB!')
    
    const db = client.db(dbName)
    const collection = db.collection('users')
    
    // Clear existing data
    await collection.deleteMany({})
    console.log('Cleared existing data')
    
    // Read and import users.json
    const data = await readFile('./users.json', 'utf-8')
    const users = JSON.parse(data)
    
    const result = await collection.insertMany(users)
    console.log(`Inserted ${result.insertedCount} users`)
    
    // Verify the data
    const allUsers = await collection.find({}).toArray()
    console.log('Users in database:', allUsers)
    
} catch (err) {
    console.error('Error:', err)
} finally {
    await client.close()
    console.log('Connection closed')
}
