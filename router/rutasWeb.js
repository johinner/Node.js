const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "title dinamico" });//renderizar ejs a html
  });
  
router.get("/app", (req, res) => {
    //res.end("<h1>Mine Aplicaciones</h1>");
    res.render('app', {titleApp: 'Mine Aplicaciones'})
  });

  module.exports = router;
