const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const { response } = require('express')
const cors = require('cors');

const app = express()
const port = 3000
app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/', (request, response) => {
    response.json({ Status: 'Get API is working.' })
})
app.get('/getAllTemp', db.getAllTemp)
app.post('/temp', db.uploadTemp)