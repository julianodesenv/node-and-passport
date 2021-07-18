const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override');
const passport = require('passport')
const app = express();

/** PASSPORT BASIC */
passport.use(require('./src/auth/basic'))

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())

app.get('*', passport.authenticate('basic', { session: false }))
require('./src/index')(app)

app.listen(9000, () => {
    console.log('Express has been started');
})