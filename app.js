const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
//const favicon      = require('serve-favicon');
// const hbs          = require('hbs');
const exphbs = require('express-handlebars')
const path         = require('path');
//const querystring = require('querystring');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
require('dotenv').config()

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 600000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 
    })
  }));

  app.use(cookieParser('super secret'));

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// bodyParsre middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


app.set('views', path.join(__dirname, 'views'));
//hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))

app.use(express.static(path.join(__dirname, 'public')));



app.use('/',require('./routes/user'))
app.use('/',require('./routes/login'))
app.use('/', attachUserInfo,authenticateWithSession,require('./routes/home'))

// doctors route
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/doctors/doctors'))
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/doctors/detail'))
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/doctors/addDoctor'))
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/doctors/docdel'))

// patients route
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/patients/patients'))
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/patients/patientDetail'))
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/patients/addPatient'))
app.use('/',attachUserInfo,authenticateWithSession,require('./routes/patients/patdel'))

function authenticate(req,res,next) {
  if(req.signedCookies.loggedIn === 'true') next()
  else res.send('please LogIn')
}

function authenticateWithSession(req,res,next) {
if(req.session.currentUser) next()
else res.redirect('/')
}


function attachUserInfo(req,res,next) {
  res.locals.currentUser = req.session.currentUser
  next()
}


module.exports = app;

app.listen(process.env.PORT, () => {
console.log('Hello');
  });