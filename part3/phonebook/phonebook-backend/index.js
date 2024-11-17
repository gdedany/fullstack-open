require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':body :method :url :response-time'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true })
    .then((result) => {
      console.log(result)

      response.json(result)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })
  newPerson
    .save()
    .then((p) => {
      response.json(p)
      console.log(p.name, p.number)
    })
    .catch((error) => next(error))
})

app.get('/api/info', (request, response) => {
  const timeNow = new Date()
  Person.find({}).then((result) => {
    const persons = result.length
    response.send(`<p>Phonebook has info for ${persons} people</p>
        <p>${timeNow}</p>`)
  })
})
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() =>
    response.status(204).end()
  )
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('errorname', error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
