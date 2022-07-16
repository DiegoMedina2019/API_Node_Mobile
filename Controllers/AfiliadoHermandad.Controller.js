const conexion = require("../Data/ConexionHermandad");
const reutilizadas = require("../Recursos/Funtions");

const asyncQUERY = (data,sql,callbackAsyncQuery) => {
    
    conexion.beginTransaction((err) => {
        if(err) callbackAsyncQuery(err);

        conexion.query(sql,data,(error,resultado) => {
            if(error) {
                return conexion.rollback(() => {
                    callbackAsyncQuery(error);
                });
            }
            conexion.commit((err) => {
                if (err) {
                    return conexion.rollback(function() {
                        callbackAsyncQuery(err);
                    });
                }
                callbackAsyncQuery(resultado);
            });
        })
    });
    
}
const final = (argsResp,cb) => { 
    //console.log('Done', argsResp.results);
    let i = 0;
    argsResp.results.forEach(elem => {
        (elem.errno)? i-- : i++;
    });
    let mjs =  (i == argsResp.cant)? argsResp.mjs_success: argsResp.mjs_err;
    cb({callMjs:mjs})
}

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
            callback(fila);
           //callback(fila[0].email);
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
        Pass:req.body.Pass
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

    //console.log(req.body);
    let data = {
        razonsocial: req.body.afiliado.razonsocial,
        nombre: req.body.afiliado.nombre,
        nif: req.body.afiliado.nif,
        domicilio : req.body.afiliado.domicilio,
        codigopostal: req.body.afiliado.codigopostal,
        poblacion: req.body.afiliado.poblacion,
        provincia: req.body.afiliado.provincia,
        telefono1: req.body.afiliado.telefono1,
        telefono2: req.body.afiliado.telefono2,
        email: req.body.afiliado.email
    }  //el orden en el arr sera el orden en el q encajen en el set del update
    
    let sql = "UPDATE afiliados SET ? WHERE idafiliado = "+req.params.id;

    asyncQUERY( data, sql, (result) => {
        let mjs_err="Hubo un inconveniente, por favor regrese y realice nuevamente la acción";
        let mjs_success="Sus datos personales fueron actualizados con exito";
        let mjs =  (result.errno)? mjs_err: mjs_success;
        callback({callMjs:mjs})
    });
}

//metodo para actualizar datos personales de un Familiar de un Afiliado 
exports.UpdateDataFamiliar = (req,callback) => {

    let familiares = req.body.familiares;
    let cant = familiares.length;
    var results = [];

    const series = (item) => {
        if(item) {           
            let sql = "UPDATE afiliadosdetalle SET ? WHERE idafiliadodetalle = "+item.idafiliadodetalle;
            let data = {
                razonsocial: item.apellido,
                nombre: item.nombre,
                nif: item.nif,
                parentesco : item.parentesco,
                fechanacimiento: item.fechanacimiento.split('Z')[0]
            }  //el orden en el arr sera el orden en el q encajen en el set del update
            asyncQUERY( data, sql, (result) => {
                results.push(result);
                return series(familiares.shift());
            });
        } else {
            let argsResp = {
                results : results,
                cant:cant,
                mjs_err:"Hubo un inconveniente, por favor regrese y realice nuevamente la acción",
                mjs_success:"Los Datos de su familia fueron actualizados con exito"
            }
            return final(argsResp,callback);
        }
    }
    series(familiares.shift());
}

exports.UpdateAfiliado = (req,callback) => {
    let body = JSON.stringify(req.body);
    if ( typeof req.body.isInit === 'undefined') { //vengo para edit solamente la pass
        let data = [
            req.body.Pass,
            req.params.id,
        ] //el orden en el arr sera el orden en el q encajen en el set del update
        let sql = "UPDATE afiliados SET Pass = ? WHERE idafiliado = ?";
        conexion.query(sql,data,(error,resultado) => {
            if(error) callback(error);
            callback(resultado);
        })

    } else { //vengo para editar la Pass y el campo login_init ya que es login por primera vez
            
        let data = [
            req.body.password,
            1,
            req.params.id,
        ] //el orden en el arr sera el orden en el q encajen en el set del update
        let sql = "UPDATE afiliados SET Pass = ?, login_init = ? WHERE idafiliado = ?";
        conexion.query(sql,data,(error,resultado) => {
            if(error) callback(error);
            callback(resultado);
        })
    }
}
exports.ElimiarAfiliado = (req,callback) => {
    conexion.query("DELETE FROM afiliados WHERE idafiliado = ?",[req.params.id],(error,resultado) => {
        if(error) callback(error);
        callback(resultado);
    })
}

exports.LoginAfiliado = (req,callback) => {
    if ( typeof req.body.registro === 'undefined') { //vengo por un Logeo
        conexion.query("SELECT * FROM afiliados WHERE email = ? AND Pass = ?",[req.body.email,req.body.Pass],(error,resultado) => {
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