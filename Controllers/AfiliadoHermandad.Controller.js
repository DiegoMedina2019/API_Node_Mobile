const conexion = require("../Data/ConexionHermandad");

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
    conexion.query("SELECT * FROM afiliados WHERE idAfiliados = ?",[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila[0].email);
        }
    })
}
exports.GetAfiliadoAux = (req,callback) => {
    conexion.query("SELECT * FROM afiliadoauxiliar WHERE Afiliados_idAfiliados = ?",[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila);
        }
    })
}
//metodo de prueba implementar con datos originales de la table real
exports.AddAfiliado = (req,callback) => {
    let data = {
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        email:req.body.email,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        password:req.body.password
    }
    let sql = "INSERT INTO afiliados SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.AddAfiliadoAux = (req,callback) => { //falso update
    let data = {
        domicilio : req.body.domicilio,
        email: req.body.email,
        telefono: req.body.telefono,
        editado: req.body.editado,
        Afiliados_idAfiliados: req.body.Afiliados_idAfiliados
    } //el orden en el arr sera el orden en el q encajen en el set del update
    let sql = "INSERT INTO afiliadoauxiliar SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.UpdateAfiliadoAux = (req,callback) => {
    let data = {
        domicilio : req.body.domicilio,
        email: req.body.email,
        telefono: req.body.telefono,
        editado: req.body.editado
    }  //el orden en el arr sera el orden en el q encajen en el set del update
    let sql = "UPDATE afiliadoauxiliar SET ? WHERE Afiliados_idAfiliados = "+req.params.id;
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
    let sql = "UPDATE afiliados SET password = ? WHERE idAfiliados = ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}
exports.ElimiarAfiliado = (req,callback) => {
    conexion.query("DELETE FROM afiliados WHERE idAfiliados = ?",[req.params.id],(error,resultado) => {
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
        conexion.query("SELECT idAfiliados FROM afiliados WHERE email = ? AND nombre = ?",[req.body.email,req.body.nombre],(error,resultado) => {
            if(error) callback(error);
            callback(resultado);
        })
    }

}

/* ALTA DE NACIMIENTOS */
exports.AddNacimiento = (req,callback) => { 
    let data = {
        fecha_nacimiento : req.body.fecha_nacimiento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        Afiliados_idAfiliados: req.body.Afiliados_idAfiliados
    } //el orden en el arr sera el orden en el q encajen en el set del update

    let sql = "INSERT INTO nacimientos SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}

//LISTADO DE RECIBOS
exports.GetRecibos = (req,callback) => {
    conexion.query("SELECT * FROM recibos WHERE Afiliados_idAfiliados = ?",[req.params.id], (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}

//LISTADO DE DOC REYES MAGOS
exports.GetReyes = (req,callback) => {
    conexion.query("SELECT * FROM documentos WHERE TipoDocumento_idTipoDocumento = 1  AND Afiliados_idAfiliados = ?",[req.params.id], (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}

//CARGAR UN DOC TIPO SEPA
exports.CargarSepa = (req,callback) => {

    /*
    proceso de carga de imagen q deberia venir por post
    */

    let data = {
        nombre:req.body.nombre,
        url:req.body.ruta,
        Afiliados_idAfiliados:req.body.idafiliado,
        TipoDocumento_idTipoDocumento:2
    }
    let sql = "INSERT INTO documentos SET ?";
    conexion.query(sql,data,(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}