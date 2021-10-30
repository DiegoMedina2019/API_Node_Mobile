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
    conexion.query("SELECT * FROM afiliados WHERE idafiliado = ?",[req.params.id], (error,fila) => {
        if(error){
            callback(error)
        }else{
           // callback(fila);
           callback(fila[0].email);
        }
    })
}
//para obtener todos los familiares de un afiliado
exports.GetFamilia = (req,callback) => {
    let sql = "SELECT \
                idafiliadodetalle,\
                razonsocial as apellido,\
                nombre, \
                nif, \
                parentesco, \
                fechanacimiento \
               FROM afiliadosdetalle WHERE idafiliado = ?";

    conexion.query(sql,[req.params.idafiliado], (error,filas) => {
        if(error){
            callback(error)
        }else{
           callback(filas);
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
    let sql = "INSERT INTO idafiliado SET ?";
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

//metodo para actualizar datos personales de un afiliado 
exports.UpdateDataAfiliado = (req,callback) => {
    let data = {
        razonsocial: req.body.razonsocial,
        nif: req.body.nif,
        domicilio : req.body.domicilio,
        codigopostal: req.body.codigopostal,
        poblacion: req.body.poblacion,
        provincia: req.body.provincia,
        telefono1: req.body.telefono1,
        telefono2: req.body.telefono2,
        email: req.body.email
    }  //el orden en el arr sera el orden en el q encajen en el set del update
    
    let sql = "UPDATE afiliados SET ? WHERE idafiliado = "+req.params.id;

    conexion.beginTransaction((err) => {
        if(err) callback(err)
            
        conexion.query(sql,data,(error,resultado) => {
            if(error) {
                return conexion.rollback(() => {
                    callback(error)
                });
            }

            conexion.commit((err) => {
                if (err) {
                    return conexion.rollback(function() {
                        callback(err)
                    });
                }

                callback(resultado)
            });
        })
    });

}

//metodo para actualizar datos personales de un Familiar de un Afiliado 
exports.UpdateDataFamiliar = (req,callback) => {
    let data = {
        razonsocial: req.body.razonsocial,
        nombre: req.body.nombre,
        nif: req.body.nif,
        parentesco : req.body.parentesco,
        fechanacimiento: req.body.fechanacimiento
    }  //el orden en el arr sera el orden en el q encajen en el set del update
    
    let sql = "UPDATE afiliadosdetalle SET ? WHERE idafiliadodetalle = "+req.params.idfamilia;

    conexion.beginTransaction((err) => {
        if(err) callback(err)
            
        conexion.query(sql,data,(error,resultado) => {
            if(error) {
                return conexion.rollback(() => {
                    callback(error)
                });
            }

            conexion.commit((err) => {
                if (err) {
                    return conexion.rollback(function() {
                        callback(err)
                    });
                }
                callback(resultado)
            });
        })
    });

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