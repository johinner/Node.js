const express = require("express");
const app = express();

const puerto = 2000;

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); //carpeta ejs

app.use(express.static(__dirname + "/public")); // carpeta public

app.get("/", (req, res) => {
  res.render("index", { title: "title dinamico" });//renderizar ejs a html
});

app.get("/app", (req, res) => {
  //res.end("<h1>Mine Aplicaciones</h1>");
  res.render('app', {titleApp: 'Mine Aplicaciones'})
});

//Middleware
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(puerto, () => {
  console.log(`visita el puerlo "http://localhost:${puerto}"`);
});
