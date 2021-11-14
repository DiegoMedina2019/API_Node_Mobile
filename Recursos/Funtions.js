
module.exports = {

    asyncQUERY : (data,sql,callbackAsyncQuery) => {
    
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
}
