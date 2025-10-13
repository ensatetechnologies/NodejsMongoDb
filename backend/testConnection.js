import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/'
const dbName = 'mongotest'
const client = new MongoClient(url)

try {
    console.log('Connecting to MongoDB with URL:', url)
    console.log('Database name:', dbName)
    await client.connect()
    console.log('Connected successfully!')
    
    // List all databases
    const adminDb = client.db('admin')
    const { databases } = await adminDb.admin().listDatabases()
    console.log('\nAll databases:')
    databases.forEach(db => console.log(`  - ${db.name} (${db.sizeOnDisk} bytes)`))
    
    const db = client.db(dbName)
    console.log('\nUsing database:', db.databaseName)
    
    // List all collections
    const collections = await db.listCollections().toArray()
    console.log('Collections in database:', collections.map(c => c.name))
    
    const collection = db.collection('users')
    console.log('\nQuerying collection:', collection.collectionName)
    
    const count = await collection.countDocuments()
    console.log('Document count:', count)
    
    const users = await collection.find({}).toArray()
    console.log('Found users:', JSON.stringify(users, null, 2))
    
} catch (err) {
    console.error('Error:', err)
    console.error('Stack:', err.stack)
} finally {
    await client.close()
    console.log('\nConnection closed')
}
