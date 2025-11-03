const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { db, init } = require('./db')
init()
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/api/properties', (req,res)=>{
  const rows = db.prepare('SELECT id, title, location, price, type, description FROM properties ORDER BY id DESC').all()
  res.json(rows)
})
app.post('/api/properties', (req,res)=>{
  const { title, location, price, type, description } = req.body
  if(!title || !location || !price) return res.status(400).json({error:'missing fields'})
  const stmt = db.prepare('INSERT INTO properties (title, location, price, type, description) VALUES (?,?,?,?,?)')
  const info = stmt.run(title, location, price, type || 'Rent', description || '')
  const row = db.prepare('SELECT id, title, location, price, type, description FROM properties WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(row)
})
app.get('/api/properties/:id', (req,res)=>{
  const row = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id)
  if(!row) return res.status(404).json({error:'not found'})
  res.json(row)
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.log('Server running on', PORT))