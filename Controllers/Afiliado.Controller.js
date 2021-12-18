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
    conexion.query("SELECT * FROM afiliados WHERE idafiliado = ?",[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila[0].email);
        }
    })
}
//metodo de prueba implementar con datos originales de la table real
exports.AddAfiliado = (req,callback) => {
    let data = {
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        email:req.body.email,
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
        req.body.password,
        req.params.id,
    ] //el orden en el arr sera el orden en el q encajen en el set del update
    let sql = "UPDATE afiliados SET password = ? WHERE idafiliado = ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.ElimiarAfiliado = (req,callback) => {
    conexion.query("DELETE FROM afiliados WHERE idafiliado = ?",[req.params.id],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}

exports.LoginAfiliado = (req,callback) => {
    if ( typeof req.body.registro === 'undefined') { //vengo por un Logeo
        conexion.query("SELECT * FROM afiliados WHERE email = ? AND password = ?",[req.body.email,req.body.password],(error,resultado) => {
            if(error) callback(error);
            callback(resultado);
        })
    } else { //vengo por un registro
        conexion.query("SELECT idafiliado FROM afiliados WHERE email = ? AND nombre = ?",[req.body.email,req.body.nombre],(error,resultado) => {
            if(error) callback(error);
            callback(resultado);
        })
    }

}

exports.GetDelegado = (req,callback) => {
    conexion.query("SELECT \
                    CONCAT(a.nombre, ' ', a.razonsocial) AS delegado,\
                    a.email AS emaildelegado,\
                    z.nombre AS oficinadelegado,\
                    z.domicilio ,\
                    z.codigopostal ,\
                    z.poblacion ,\
                    z.provincia ,\
                    z.telefono1 ,\
                    z.telefono2 \
                FROM\
                    comites c\
                        LEFT JOIN\
                    afiliados a ON c.idResponsable = a.idafiliado\
                        LEFT JOIN\
                    zonas z ON a.idoficina = z.idzona\
                WHERE\
                    c.idcomite = 12",[], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila[0]);
        }
    })
}