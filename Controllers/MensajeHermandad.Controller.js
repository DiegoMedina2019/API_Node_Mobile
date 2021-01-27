const conexion = require("../Data/ConexionHermandad");
const moment = require("moment-timezone");
moment().tz("Europe/Madrid").format();

exports.GetMensajes = (req,callback) => {
    let query  = "SELECT * FROM mensajes WHERE Afiliados_idAfiliados = ?";
    conexion.query(query,req.params.id, (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}


exports.GetMensaje = (req,callback) => {
    let query  = "SELECT * FROM mensajes WHERE idMensajes = ?";
    conexion.query(query,[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila);
        }
    }).on('error', function(err) {
        console.log("[mysql error] Mi error",err);
      });
}
exports.AddMensaje = (req,callback) => {
    let data = {
        emisor:req.body.emisor,
        mensaje:req.body.mensaje,
        Fecha: new Date(),
        Afiliados_idAfiliados:req.body.idafiliado,
    }
    let sql = "INSERT INTO mensajes SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.UpdateMensaje = (req,callback) => {
   // console.log(req.body);
    let data = [
        req.body.visto.split('Z')[0],
        req.params.id,
    ] //el orden en el arr sera el orden en el q encajen en el set del update
    let sql = "UPDATE mensajes SET visto = ? WHERE idMensajes= ?";
  //  console.log(data);
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.ElimiarMensaje = (req,callback) => {
    conexion.query("DELETE FROM mensajes WHERE idMensajes = ?",[req.params.id],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}