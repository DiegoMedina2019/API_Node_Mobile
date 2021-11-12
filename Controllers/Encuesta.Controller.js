const conexion = require("../Data/Conexion.Mysql");

exports.AllEncuestas = (req,callback)=>{

    conexion.query("SELECT encuesta_cabecera.idencuestacabecera,tipo,nombre,DesdeFecha,HastaFecha,idencuestas_afiliados\
                    FROM encuesta_cabecera \
                    JOIN\
                    encuestas_has_afiliados ON encuesta_cabecera.idencuestacabecera = encuestas_has_afiliados.idencuestacabecera\
                    where tipo = ? \
                    AND now() >= DesdeFecha\
                    AND now() <= HastaFecha\
                    AND encuestas_has_afiliados.idafiliado = ?\
                    AND encuestas_has_afiliados.realizada = 0",[req.params.tipo,req.params.afiliado], (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}
/* exports.AllVotaciones = (req,callback)=>{
    conexion.query("SELECT idencuestacabecera,nombre,DesdeFecha,HastaFecha\
                    FROM encuesta_cabecera where tipo = 'V' \
                    AND now() >= DesdeFecha\
                    AND now() <= HastaFecha", (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
} */
exports.AllPreguntas = (req,callback)=>{
    let id = req.params.idencuesta;
    conexion.query("SELECT \
                    idencuestadetalle,Pregunta,Resultado \
                    FROM encuesta_detalle\
                    WHERE idencuestacabecera = ? AND insertado = 1 AND borrado = 0",[id],(error,filas) =>{
        if(error){
            callback(error)
        }else{            
            callback(filas);
        }
    })
}

const asyncQUERY = (data,sql, callbackAsyncQuery) => {

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

// Final funcion que se encarga de setear el mjs de error
const final = (argsResp,cb) => { 
    //console.log('Done', argsResp.results);
    let i = 0;
    argsResp.results.forEach(elem => {
        (elem.errno)? i-- : i++;
    });
    let mjs =  (i == argsResp.cant)? argsResp.mjs_success: argsResp.mjs_err;
    cb({callMjs:mjs})
}

exports.SetRespuesta = (req, callback) =>{
    let respuestas = req.body.respuestas;
    let cant = respuestas.length;
    var results = [];
    
    const series = (item) => {

        let sql1 = "INSERT INTO encuesta_resultado \
                    (`idencuestadetalle`, `idafiliado`, `FechaHoraVotacion`, `ResultadoSN`, `idEmpresa`, `borrado`, `insertado`)\
                    VALUES (?, ?, now(), ?, '000', '0', '1')";
        let sql2 = "INSERT INTO encuesta_resultado \
                    (`idencuestadetalle`, `idafiliado`, `FechaHoraVotacion`, `ResultadoValor`, `idEmpresa`, `borrado`, `insertado`)\
                     VALUES (?, ?, now(), ?, '000', '0', '1')";
        if(item) {
            if(item.Resultado == 1){
                let data1 = [
                    item.idencuestadetalle,
                    item.idafiliado,
                    item.ResultadoSN
                ]
                asyncQUERY( data1, sql1, (result) => {
                    results.push(result);
                    return series(respuestas.shift());
                });
            }else{
                let data2 = [
                    item.idencuestadetalle,
                    item.idafiliado,
                    item.ResultadoValor
                ]
                asyncQUERY( data2, sql2, (result) => {
                    results.push(result);
                    return series(respuestas.shift());
                });
            }
            
            /* let sql = "UPDATE encuesta_detalle SET Resultado = ?, idModificacion = now() WHERE idencuestadetalle= ?";
            let data = [
                item.Resultado,
                item.idencuestadetalle
            ]
            asyncQUERY( data, sql, (result) => {
                results.push(result);
                return series(respuestas.shift());
            }); */
        } else {
            let argsResp = {
                results : results,
                cant:cant,
                mjs_err:"Hubo un inconveniente, por favor regrese y realice nuevamente la acción",
                mjs_success:"Su encuesta fue enviada con exito"
            }
            return final(argsResp,callback);
        }
    }
    series(respuestas.shift());
}

