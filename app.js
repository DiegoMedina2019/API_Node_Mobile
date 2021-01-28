const express = require("express");
const cors = require("cors");

const https = require('https')
const fs = require('fs')

const app = express();
app.use(express.json());
app.use(cors());

/*
corren con localhost como con la ip
*/
https.createServer({
  key: fs.readFileSync('localhost+4-key.pem'),
  cert: fs.readFileSync('localhost+4.pem.crt')
}, app).listen(433, () => {
  console.log('Escuchando en el puerto 433...')
})



app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Ruta Inicio");
})

app.get("/recibo/:url",(req,res) => {

  let ruta = "public/documentos/recibos/"+req.params.url;
  res.redirect('/descargas.html?ruta='+ruta)

})

app.get("/reyes/:url",(req,res) => {

  let ruta = "public/documentos/reyes_magos/"+req.params.url;
  res.redirect('/descargas.html?ruta='+ruta)

})

app.post("/descargas", (req,res) =>{
  //var file = __dirname + '/public/documentos/reyes_magos/' +req.params.url;
  let file = __dirname + '/'+req.body.url;
   res.download(file);  //reyes2_afi1.jpg
})


// se le puede asignar por consola set PUERTO=7000 por ejemplo pero si no esta asignado usara el 3000
/* const puerto = process.env.PUERTO || 3000; 
app.listen(puerto,() => {
    console.log("Seervidor OK en puerto: "+puerto)
})  */



const afiliadoRouter = require("./Routers/Afiliado.Router")
const mensajeRouter = require("./Routers/Mensaje.Router");
const { send } = require("process");

app.use("/api/",afiliadoRouter)
app.use("/api/",mensajeRouter)