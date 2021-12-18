const { Router } = require("express");
const encuestaRouter = Router();
const controladorEncuesta = require('../Controllers/Encuesta.Controller');

encuestaRouter.get('/encuestas/:tipo/:afiliado',(req,res) =>{
    controladorEncuesta.AllEncuestas(req,(respuesta)=>{
        res.send(respuesta)
    })
})
encuestaRouter.get("/encuestas_preguntas/:idencuesta",(req,res) => {
    controladorEncuesta.AllPreguntas(req,(respuesta) => {
        res.send(respuesta)
    })
})

encuestaRouter.post("/encuestas/respondida",(req,res) => {
    controladorEncuesta.SetRespuesta(req,(respuesta) => {
        res.send(respuesta)
    })
})

encuestaRouter.get("/doc_encuestas/:idencuesta",(req,res)=> {
    controladorEncuesta.GetDoc(req,(respuesta)=>{

        if (respuesta.exite) {
            res.redirect('/doc_encuesta.html?ruta='+respuesta.ruta)
        } else {
            res.redirect('/doc_encuesta_notExit.html')
        }
        
        //res.send(respuesta)
    })
})

module.exports = encuestaRouter;