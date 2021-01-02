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






/* app.get("/",(req,res) => {
    res.send("Ruta Inicio");
})

// se le puede asignar por consola set PUERTO=7000 por ejemplo pero si no esta asignado usara el 3000
const puerto = process.env.PUERTO || 3000; 
app.listen(puerto,() => {
    console.log("Seervidor OK en puerto: "+puerto)
}) */



const afiliadoRouter = require("./Routers/Afiliado.Router")
const mensajeRouter = require("./Routers/Mensaje.Router")

app.use("/api/",afiliadoRouter)
app.use("/api/",mensajeRouter)