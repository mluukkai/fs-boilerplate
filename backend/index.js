import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import { sequelize } from './util/db.js'
import Press from './models/press.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

await sequelize.sync()

const today = () => new Date().toISOString().slice(0, 10)

const getStats = async () => {
  const date = today()
  const todayRow = await Press.findByPk(date)
  const maxRow = await Press.findOne({ order: [['count', 'DESC']] })

  return {
    today: { date, count: todayRow ? todayRow.count : 0 },
    max: maxRow ? { date: maxRow.date, count: maxRow.count } : null
  }
}

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/press', async (req, res) => {
  const [row] = await Press.findOrCreate({ where: { date: today() } })
  await row.increment('count')

  res.json(await getStats())
})

app.get('/api/stats', async (req, res) => {
  res.json(await getStats())
})

// serve the built Vite frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
