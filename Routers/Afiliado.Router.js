const express = require("express");
const afiliadoRouter = express.Router();
const controlador = require("../Controllers/Afiliado.Controller");
const controlHermandad = require("../Controllers/AfiliadoHermandad.Controller");

//TRAE TODOS LOS AFILIADOS
afiliadoRouter.get("/afiliados",(req,res) => {
    if (req.body.db === 'hermandad') {
        controlHermandad.GetAfiliados( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {//ira a asprobak        
        controlador.GetAfiliados( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
//TRAE SOLO UN AFILIADO
afiliadoRouter.get("/afiliado/:id",(req,res) => {
    if (req.body.db === 'hermandad') {
        controlHermandad.GetAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {//ira a asprobak    
        controlador.GetAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
afiliadoRouter.get("/afiliadoAux/:id",(req,res) => { //esta ruta define si el afiliado podra editar sus datos
    controlHermandad.GetAfiliadoAux( req ,(respuesta) => {
        if (respuesta.length == 0 || respuesta[0].editado == 0) {
            res.status(200).send(respuesta)
        } else {
            res.status(404).send("Ya hay una solicitud en proceso.")
        }
    })
})
//CREAR UN AFILIADO
afiliadoRouter.post("/afiliado",(req,res) => {
    if (req.body.db === 'hermandad') {
        controlHermandad.AddAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {//ira a asprobak  
        controlador.AddAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
//CREAR UN AFILIADO AUX
afiliadoRouter.post("/afiliadoAux",(req,res) => {
    controlHermandad.AddAfiliadoAux( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//EDITAR UN AFILIADO
afiliadoRouter.put("/afiliado/:id",(req,res) => {
    if (req.body.db === 'hermandad') {
        controlHermandad.UpdateAfiliadoAux( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {//ira a asprobak  
        controlador.UpdateAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})
//SET LA NUEVA PASSWOR DEL AFILIADO QUE SE REGISTRA
afiliadoRouter.put("/set_pass_afiliado_hermandad/:id",(req,res) => {
    controlHermandad.UpdateAfiliado( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//ELIMINAR UN AFILIADO
afiliadoRouter.delete("/afiliado/:id",(req,res) => {
    if (req.body.db === 'hermandad') {
        controlHermandad.ElimiarAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    } else {//ira a asprobak  
        controlador.ElimiarAfiliado( req ,(respuesta) => {
            res.send(respuesta)
        })
    }
})

//LOGIN AFILIADO
afiliadoRouter.post("/login",(req,res) => {
    if (req.body.db === 'hermandad') {
        controlHermandad.LoginAfiliado( req ,(respuesta) => {
            if(respuesta.length>0){
                res.status(200).send(respuesta)
            }else{
                res.status(404).send(respuesta)
            }
        })
    } else {//ira a asprobak  
        controlador.LoginAfiliado( req ,(respuesta) => {
            if(respuesta.length>0){
                res.status(200).send(respuesta)
            }else{
                res.status(404).send(respuesta)
            }
        })
    }
})

//CREAR UN NACIMIENTO
afiliadoRouter.post("/nacimiento",(req,res) => {
    controlHermandad.AddNacimiento( req ,(respuesta) => {
        res.send(respuesta)
    })
})

//TRAE TODOS LOS RECIBOS
afiliadoRouter.get("/recibos/:id",(req,res) => {
    controlHermandad.GetRecibos( req ,(respuesta) => {
        res.send(respuesta)
    })
})
//TRAE TODOS LAS FOTOS DE REYES
afiliadoRouter.get("/reyes_magos/:id",(req,res) => {
    controlHermandad.GetReyes( req ,(respuesta) => {
        res.send(respuesta)
    })
})

//SUBIR DOC SEPAS
afiliadoRouter.post("/sepa",(req,res) => {
    controlHermandad.CargarSepa( req ,(respuesta) => {
        res.send(respuesta)
    })
})

module.exports = afiliadoRouter;