const conexion = require("../Data/Conexion.Mysql");

exports.GetMensajes = (req,callback) => {
    conexion.query("SELECT * FROM mensajes WHERE afiliados_idafiliados = ?",req.params.id, (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}


exports.GetMensaje = (req,callback) => {

    conexion.query("SELECT * FROM mensajes WHERE idmensajes = ?",[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila[0].mensaje);
        }
    }).on('error', function(err) {
        console.log("[mysql error] Mi error",err);
      });
}
exports.AddMensaje = (req,callback) => {
    let data = {
        emisor:req.body.emisor,
        mensaje:req.body.mensaje,
        fecha: new Date(),
        visto:0,
        afiliados_idafiliados:req.body.afiliados_idafiliados
    }
    let sql = "INSERT INTO mensajes SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.UpdateMensaje = (req,callback) => {
    let data = [
        req.body.emisor,
        req.body.mensaje,
        req.body.visto,
        req.params.id,
    ] //el orden en el arr sera el orden en el q encajen en el set del update
    let sql = "UPDATE mensajes SET emisor = ?, mensaje = ?, visto = ? WHERE idmensajes= ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.ElimiarMensaje = (req,callback) => {
    conexion.query("DELETE FROM mensajes WHERE idmensajes = ?",[req.params.id],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}