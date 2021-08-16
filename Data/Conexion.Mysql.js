const mysql = require("mysql");

//CONEXION A ASPROBANK
 var conexion = mysql.createConnection({
    host: '82.159.210.91',
    database:'asprobank',
    user:'asprob',
    password:'asprob2604'
}) 

//CONEXION A localhost---falso servicio o DB produccion
/* const conexion = mysql.createConnection({
    host: 'localhost',
    database:'falsoservicio',
    user:'root',
    password:'lhe2604'
}) */
/* const conexion = mysql.createConnection({
    host: 'localhost',
    database:'asprobank',
    user:'asprob',
    password:'asprob2604'
}) */

conexion.connect(
    (error) => {
        if(error) throw error;
        console.log("CONEXION EXITOSA");
    }
)

module.exports = conexion;



//--------------------------------------------------------------//
//consultas:
//todas las tablas
/* conexion.query("SHOW FULL TABLES FROM asprobank", (error,resultado,campos) => {
    if(error) {throw error;}
    else{
        resultado.forEach(elemt => {
            console.log(elemt);
        });
    }
}) */