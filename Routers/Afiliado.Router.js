const express = require("express");
const afiliadoRouter = express.Router();
const controlador = require("../Controllers/Afiliado.Controller");

//TRAE TODOS LOS AFILIADOS
afiliadoRouter.get("/afiliados",(req,res) => {
    controlador.GetAfiliados( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//TRAE SOLO UN AFILIADO
afiliadoRouter.get("/afiliados/:id",(req,res) => {
    controlador.GetAfiliado( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//CREAR UN AFILIADO
afiliadoRouter.post("/afiliados",(req,res) => {
    controlador.AddAfiliado( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//EDITAR UN AFILIADO
afiliadoRouter.put("/afiliados/:id",(req,res) => {
    controlador.UpdateAfiliado( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//ELIMINAR UN AFILIADO
afiliadoRouter.delete("/afiliados/:id",(req,res) => {
    controlador.ElimiarAfiliado( req ,(respuesta) => {
        res.send(respuesta)
    })
})

//LOGIN AFILIADO
afiliadoRouter.post("/login",(req,res) => {
    controlador.LoginAfiliado( req ,(respuesta) => {
        if(respuesta.length>0){
            res.status(200).send(respuesta)
        }else{
            res.status(404).send(respuesta)
        }
    })
})

module.exports = afiliadoRouter;