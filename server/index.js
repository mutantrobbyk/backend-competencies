require('dotenv').config()
const express = require("express");
const app = express();
const massive = require("massive");
const ctrl = require("./controller");
const session = require("express-session");
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
app.use(express.json());
app.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })
app.use("/static", express.static("./media"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
});

app.post("/auth/register", ctrl.register);
app.post("/auth/login", ctrl.login);
app.put(`/tests/:id`, ctrl.update)
app.get('/tests/getAllUsers/:id')
app.get('/tests', ctrl.title)
app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id)
    next()
  }, function (req, res, next) {
    res.send('User Info')
  })
