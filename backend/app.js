import express from 'express'
import { postsRoutes } from './routes/posts.js'

const app = express()

// Add JSON body parser middleware
app.use(express.json())

postsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }