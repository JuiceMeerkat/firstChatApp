// Centralised error handling
const errorHandling = (err, req, res, next) => {

    
    console.log("Centralised error handling called")
    // console.log(' and req.client.parser.socket.parser.socket : ', req.client.parser.socket.parser.socket);
    // console.log(err.stack);
    console.log('err : ', err);
    // console.log('json : ', {
    //     status: err.status || 500,
    //     message: "Something went wrong, check status code and error for more details.",
    //     error: err.message,
    //     "req": req
    //     // req: req
    // })
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: "Something went wrong, check status code and error for more details.",
        error: err.message,
        "req": req._maxListeners
        // req: req
    })
}

export default errorHandling;