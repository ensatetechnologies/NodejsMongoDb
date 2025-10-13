import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
const server = createServer((req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
        res.end(readFileSync('users.json'))
})
const PORT = 3000
const HOSTNAME = 'localhost'
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
})