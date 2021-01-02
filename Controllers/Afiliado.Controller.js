const conexion = require("../Data/Conexion.Mysql");

exports.GetAfiliados = (req,callback) => {
    conexion.query("SELECT * FROM afiliados", (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}
exports.GetAfiliado = (req,callback) => {
    conexion.query("SELECT * FROM afiliados WHERE idafiliados = ?",[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila[0].correo);
        }
    })
}
exports.AddAfiliado = (req,callback) => {
    let data = {
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        correo:req.body.correo,
        password:req.body.password
    }
    let sql = "INSERT INTO afiliados SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.UpdateAfiliado = (req,callback) => {
    let data = [
        req.body.nombre,
        req.body.apellido,
        req.body.correo,
        req.body.password,
        req.params.id,
    ] //el orden en el arr sera el orden en el q encajen en el set del update
    let sql = "UPDATE afiliados SET nombre = ?, apellido = ?, correo = ?, password = ? WHERE idafiliados= ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.ElimiarAfiliado = (req,callback) => {
    conexion.query("DELETE FROM afiliados WHERE idafiliados = ?",[req.params.id],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}

exports.LoginAfiliado = (req,callback) => {
    conexion.query("SELECT * FROM afiliados WHERE correo = ? AND password = ?",[req.body.correo,req.body.password],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}