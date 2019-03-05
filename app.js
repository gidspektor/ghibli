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
const updateUserScore = require('./updateUserDb.js')
const checkUserExists = require('./checkIfUserExists.js')
const user = require('./grabUser.js')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const fillTable = require('./fillUserTable.js')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())
app.use(session({
    secret: "ghibli",
    cookie: {secure: false}
}))

app.get('/dataScrape', (req,res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        console.log('connected to db')
        const db = client.db(dbName)
        dataScrape.dataScrape(fetch, db)
    })
     res.send('done')
})

app.get('/login', (req, res) => {
    req.session.destroy()
    res.render('login')
})

app.post('/checkExistence', (req, res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        console.log("connected")
        let db = client.db(dbName)
        checkUserExists.checkUser(db, req, function(docs, user) {
            if (docs.length > 1) {
                req.session.email = user
                req.session.save()
                res.redirect('/userPage')
            } else if (docs.length == 0) {
                req.session.email = user
                req.session.save()
                res.redirect('/createNewUser')
            }
        })
    })
})

app.get('/createNewUser', (req, res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        let db = client.db(dbName)
        let email = req.session.email
        fillTable.fillUserTable(db, email)
        res.redirect('/userPage')
    })
})

app.post('/userScore', (req, res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        let db = client.db(dbName)
        let email = req.session.email
        updateUserScore.updateUserDb(db, req, email)
        res.redirect('/userPage')
    })
})

app.get('/userPage', (req, res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        let db = client.db(dbName)
        let email = req.session.email
        user.grabUser(db, email, function(docs) {
            res.render('userHome', {data: docs})
        })
    })
})

app.get('/public', (req,res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        console.log("Connected successfully to db")
        let db = client.db(dbName)
        grabData.grabData(db, function(docs) {
            res.render('home', {data: docs})
        })
    })
})

app.post('/publicScore', (req, res) => {
    client.connect((err, client) => {
        assert.equal(null, err)
        console.log("Connected successfully to db")
        let db = client.db(dbName)
        update.updateDb(db, req)
        res.redirect('/public')
    })
})

app.listen(port, () => {console.log("watching you")})