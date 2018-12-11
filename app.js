const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://localhost:27017'
const dbName = 'ghibli'
const client = new MongoClient(url,{useNewUrlParser: true })
const fetch = require('node-fetch')
const dataScrape = require('./dataScrape.js')
const grabData = require('./grabData.js')
const exphbs = require('express-handlebars')
const update = require('./updateDb.js')
const bodyParser = require('body-parser')

let jsonParser = bodyParser.json

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/mongodb', (req,res) => {
    client.connect((err,client) => {
        assert.equal(null, err)
        console.log("Connected successfully to server")
        const db = client.db(dbName);
        dataScrape.dataScrape(db,fetch)
    })
    res.send('done')
})

app.get('/ghibli', (req,res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        console.log("Connected successfully to db")
        const db = client.db(dbName);
        grabData.grabData(db, function(docs) {
            res.render('home', {data: docs})
        })
    })
})

app.post('/edit',jsonParser, (req, res) => {
    console.log("hi")
    client.connect((err, client) => {
    assert.equal(null, err)
    console.log("Connected successfully to db")
    const db = client.db(dbName);
    update.updateDb(db, req)
    console.log(res.json(req.body))
    })
    res.send('done')
})

app.listen(port, () => {console.log("watching you")})