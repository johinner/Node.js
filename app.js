const express = require("express");
const app = express();

require('dotenv').config()

const puerto = process.env.PORT || 8000; // puerto auto de heroku
//conexion a base de datos mongoDB
const mongoose = require('mongoose');//mongoosejs.com
const { route } = require("./router/rutasWeb");

//const uri =`mongodb+srv://johinnerMC:${process.env.PASSWORD}@cluster0.tfow3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); //carpeta ejs

app.use(express.static(__dirname + "/public")); // carpeta public

//rutas web
app.use('/', require('./router/rutasWeb'))
app.use('/mascotas', require('./router/mascotas'))

//Middleware
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(puerto, () => {
  console.log(`visita el puerlo "http://localhost:${puerto}"`);
  
});
