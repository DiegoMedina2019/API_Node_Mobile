const express = require("express");
const mensajeRouter = express.Router();
const controlador = require("../Controllers/Mensaje.Controller");

//TRAE TODOS LOS mensajeS
mensajeRouter.get("/mensajes/:id",(req,res) => {
    controlador.GetMensajes( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//TRAE SOLO UN mensaje
mensajeRouter.get("/mensajes/:id",(req,res) => {
    controlador.GetMensaje( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//CREAR UN mensaje
mensajeRouter.post("/mensajes",(req,res) => {
    controlador.AddMensaje( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//EDITAR UN mensaje
mensajeRouter.put("/mensajes/:id",(req,res) => {
    controlador.UpdateMensaje( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//ELIMINAR UN mensaje
mensajeRouter.delete("/mensajes/:id",(req,res) => {
    controlador.ElimiarMensaje( req ,(respuesta) => {
        res.send(respuesta)
    })
})

module.exports = mensajeRouter;




