const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req,res) => JSON.stringify(req.params))

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(morgan(':method :url :body :response-time'))
app.use(cors())

let persons = [
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`<p>puhelinluettelossa on ${persons.length} henkilön tiedot</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id )
  if (person) {
    res.json(person)
  } else {
    res.status(404)
    .send('Not found');
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: 'name or number missing'})
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({error: 'name already exists'})
  }

  const person = {
  name: body.name,
  number: body.number,
  id: Math.round(Math.random() * 1000000)
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 0
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
