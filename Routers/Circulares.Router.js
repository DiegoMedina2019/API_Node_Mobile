const express = require("express");

const circularesRouter = express.Router();
const controller = require("../Controllers/Circulares.Controller") //si se implementa algo mas dinamico por base de datos debere usarlo

circularesRouter.get("/circulares", (req,res) => {
    //let ruta = "public/documentos/sirculares/"+req.params.url;
    //res.redirect('/descargas_sirculares.html?ruta='+ruta)
    res.redirect('/descargas_circulares.html')
})

module.exports = circularesRouter;