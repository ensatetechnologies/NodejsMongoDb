import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017/'
const dbName = 'mongotest'
const client = new MongoClient(url)

const server = createServer(async (req, res) => {
    try {
        const db = client.db(dbName)
        const collection = db.collection('users')
        const users = await collection.find({}).toArray()
        
        console.log(`Found ${users.length} users`)
        
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(users, null, 2))
    } catch (err) {
        console.error('Error fetching data:', err)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: err.message }))
    }
})

const PORT = 3000
const HOSTNAME = 'localhost'

// Connect to MongoDB before starting the server
try {
    await client.connect()
    console.log('Successfully connected to MongoDB!')
    
    // Check if data exists
    const db = client.db(dbName)
    const collection = db.collection('users')
    const count = await collection.countDocuments()
    console.log(`Database has ${count} users`)
    
    server.listen(PORT, HOSTNAME, () => {
        console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
    })
} catch (err) {
    console.error('Error connecting to database:', err)
    process.exit(1)
}