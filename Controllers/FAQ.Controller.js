const conexion = require("../Data/Conexion.Mysql");

exports.AllFamiliasPreguntas = (req,callback)=>{
    conexion.query("SELECT idfamiliapregunta,Nombre as nombre_familia\
                    FROM familiaspreguntas \
                    where borrado = 0 AND insertado = 1 ",[], (error,filas) => {
        if(error){
            callback(error)
        }else{
            callback(filas);
        }
    })
}

exports.AllPreguntas = (req,callback)=>{
    let id = req.body.idfamilia;
    conexion.query("SELECT idpregunta, idFamiliapregunta, Pregunta as pregunta, Respuesta as respuesta \
                    FROM preguntas\
                    WHERE idFamiliapregunta = ? AND insertado = 1 AND borrado = 0",[id],(error,filas) =>{
        if(error){
            callback(error)
        }else{            
            callback(filas);
        }
    })
}