const conexion = require("../Data/Conexion.Mysql");
const moment = require("moment-timezone");
moment().tz("Europe/Madrid").format();

exports.GetMensajes = (req,callback) => {
    let query  = "SELECT empresas.nombre,mensajes.idmensaje,mensajes.idafiliado,mensajes.Mensaje, \
    mensajes.Fecha, mensajes.idEmpresa FROM mensajes\
                     join empresas ON mensajes.idEmpresa = empresas.idempresa\
                     WHERE idafiliado = ?";
    conexion.query(query,req.params.id, (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}


exports.GetMensaje = (req,callback) => {
    let query  = "SELECT empresas.nombre,mensajes.* FROM mensajes\
                     join empresas ON mensajes.idEmpresa = empresas.idempresa\
                     WHERE idmensaje = ?";
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
        Mensaje:req.body.Mensaje,
        Fecha: new Date(),
        idCreacion: new Date(),
        idEmpresa:req.body.idEmpresa,
        idafiliado:req.body.idafiliado
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
        req.body.FechaVisto.split('Z')[0],
        req.body.idModificacion.split('Z')[0],
        req.params.id,
    ] //el orden en el arr sera el orden en el q encajen en el set del update

    let sql = "UPDATE mensajes SET FechaVisto = ?, idModificacion = ? WHERE idmensaje= ?";
     console.log(data);
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.ElimiarMensaje = (req,callback) => {
    conexion.query("DELETE FROM mensajes WHERE idmensaje = ?",[req.params.id],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}