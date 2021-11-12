const mysql = require("mysql");

//CONEXION A ASPROBANK
/* var conexionHermandad = mysql.createConnection({
    host: '82.159.210.91',
    database:'hermandad',
    user:'hdad',
    password:'hdad2604'
}) */

//CONEXION A localhost---falso servicio o DB produccion
const conexionHermandad = mysql.createConnection({
    host: 'localhost',
    database:'hermandad',
    user:'root',
    password:'lhe2604'
})
/* const conexionHermandad = mysql.createConnection({
    host: 'localhost',
    database:'hermandad',
    user:'root',
    password:''
}) */

conexionHermandad.connect(
    (error) => {
        if(error) throw error;
        console.log("CONEXION EXITOSA");
    }
)

module.exports = conexionHermandad;