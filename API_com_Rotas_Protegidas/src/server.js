const express = require('express')
const router = require("./routes")

const app = express()
app.use(express.json())

const session = require('express-session');
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Altere para true se estiver usando HTTPS
}));

app.use(express.urlencoded({extended:true}))

app.use(router)

app.listen(3000, () => console.log("Servidor iniciado!: http://localhost:3000/"))