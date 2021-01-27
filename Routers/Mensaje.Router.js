const express = require("express");
const mensajeRouter = express.Router();
const controlador = require("../Controllers/Mensaje.Controller");
const controlHermandad = require("../Controllers/MensajeHermandad.Controller");

//TRAE TODOS LOS mensajeS
mensajeRouter.get("/mensajes/:id",(req,res) => {
    controlador.GetMensajes( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//TRAE TODOS LOS mensajeS de la db hermandad
mensajeRouter.get("/mensajes_hermndad/:id",(req,res) => {
    controlHermandad.GetMensajes( req ,(respuesta) => {
        res.send(respuesta)
    })
})

//TRAE SOLO UN mensaje
mensajeRouter.get("/mensaje/:id",(req,res) => {
    if (req.body.db === "hermandad") {
        controlHermandad.GetMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {
        controlador.GetMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
//CREAR UN mensaje
mensajeRouter.post("/mensajes",(req,res) => {
    if (req.body.db === "hermandad") {
        controlHermandad.AddMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {
        controlador.AddMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
//EDITAR UN mensaje
mensajeRouter.put("/mensajes/:id",(req,res) => {
    if (req.body.db === "hermandad") {
        controlHermandad.UpdateMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {
        controlador.UpdateMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
//ELIMINAR UN mensaje
mensajeRouter.delete("/mensajes/:id",(req,res) => {
    if (req.body.db === "hermandad") {
        controlHermandad.ElimiarMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {
        controlador.ElimiarMensaje( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})

module.exports = mensajeRouter;




