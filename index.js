const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override');
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()

/** PASSPORT BASIC */
// passport.use(require('./src/auth/basic'))
// app.get('*', passport.authenticate('basic', { session: false }))

/** PASSPORT LOCAL */
require('./src/auth/local')(passport)

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(session({ secret: '!JHDB*@#A9H$', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))

require('./src/index')(app, passport)

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })
mongoose.Promise = global.Promise
app.listen(9001, () => {
    console.log('Express has been started');
})