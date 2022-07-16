const { Router } = require("express");
const encuestaHermandadRouter = Router();
const controladorEncuestaHermandad = require('../Controllers/Encuesta_Hermandad.Controller');

encuestaHermandadRouter.get('/encuestas_h/:tipo/:afiliado',(req,res) =>{
    controladorEncuestaHermandad.AllEncuestas(req,(respuesta)=>{
        res.send(respuesta)
    })
})
encuestaHermandadRouter.get("/encuestas_h_preguntas/:idencuesta",(req,res) => {
    controladorEncuestaHermandad.AllPreguntas(req,(respuesta) => {
        res.send(respuesta)
    })
})

encuestaHermandadRouter.post("/encuestas_h/respondida",(req,res) => {
    controladorEncuestaHermandad.SetRespuesta(req,(respuesta) => {
        res.send(respuesta)
    })
})

encuestaHermandadRouter.get("/doc_encuestas_h/:idencuesta",(req,res)=> {
    controladorEncuestaHermandad.GetDoc(req,(respuesta)=>{

        if (respuesta.exite) {
            res.redirect('/doc_encuesta_h.html?ruta='+respuesta.ruta)
        } else {
            res.redirect('/doc_encuesta_h_notExit.html')
        }
        
        //res.send(respuesta)
    })
})

module.exports = encuestaHermandadRouter;