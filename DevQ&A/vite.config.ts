import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function qaSyncPlugin(): Plugin {
  const dataDir = fileURLToPath(new URL('./data', import.meta.url))
  const questionsFilePath = path.join(dataDir, 'questions.json')
  const categoriesFilePath = path.join(dataDir, 'categories.json')
  const lessonsFilePath = path.join(dataDir, 'lessons.json')

  return {
    name: 'qa-sync-plugin',
    configureServer(server) {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      // Categories Endpoint
      server.middlewares.use('/api/categories', (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method === 'GET') {
          if (!fs.existsSync(categoriesFilePath)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(['Backend', 'Web Development', 'Computer Science', 'Database']))
            return
          }
          const content = fs.readFileSync(categoriesFilePath, 'utf-8')
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(content || '[]')
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body)
              fs.writeFileSync(categoriesFilePath, JSON.stringify(parsed, null, 2), 'utf-8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err: any) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err?.message || 'Invalid JSON' }))
            }
          })
          return
        }

        next()
      })

      // Questions Endpoint
      server.middlewares.use('/api/questions', (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method === 'GET') {
          if (!fs.existsSync(questionsFilePath)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([]))
            return
          }
          const content = fs.readFileSync(questionsFilePath, 'utf-8')
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(content || '[]')
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body)
              fs.writeFileSync(questionsFilePath, JSON.stringify(parsed, null, 2), 'utf-8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, count: Array.isArray(parsed) ? parsed.length : 0 }))
            } catch (err: any) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err?.message || 'Invalid JSON' }))
            }
          })
          return
        }

        next()
      })

      // Lessons Endpoint
      server.middlewares.use('/api/lessons', (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method === 'GET') {
          if (!fs.existsSync(lessonsFilePath)) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([]))
            return
          }
          const content = fs.readFileSync(lessonsFilePath, 'utf-8')
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(content || '[]')
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body)
              fs.writeFileSync(lessonsFilePath, JSON.stringify(parsed, null, 2), 'utf-8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, count: Array.isArray(parsed) ? parsed.length : 0 }))
            } catch (err: any) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err?.message || 'Invalid JSON' }))
            }
          })
          return
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    qaSyncPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
