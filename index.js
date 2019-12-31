const express = require('express')
const app = express()

app.use(express.static('data'))

app.use(express.json())

app.use('/agents', require('./agents.js'))
app.use('/customers', require('./customers.js'))

app.use((req, res) => {
  res.status(404)
    .send('unknown request')
})

app.listen(3000, () => console.log('listening on port 3000...'))
