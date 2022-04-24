const express = require("express");

const FAQRouter = express.Router();
const controller = require("../Controllers/FAQ.Controller") 

//obtengo la lista de todas las familias de preguntas habilitadas
FAQRouter.get("/list_familias", (req,res) => {
    controller.AllFamiliasPreguntas(req,(respuesta)=>{
        res.send(respuesta)
    })
})

//obtengo la lista de todas las preguntas de una determinada familia y esten habilitadas
FAQRouter.post("/list_preguntas", (req,res) => {
    controller.AllPreguntas(req,(respuesta)=>{
        res.send(respuesta)
    })
})

module.exports = FAQRouter;