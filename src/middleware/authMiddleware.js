import jwt from "jsonwebtoken";
import util from "util";
import dotenv from "dotenv";
dotenv.config();
// console.log('jwt.verify() : ', jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU1ODA2MTE4LCJleHAiOjE3NTU4MDk3MTh9.DUHJ9hFTXTd1b_hYXgti3-Oha-sVhbO0d0w1WcEv9EI', process.env.JWT_SECRET))

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU1OTU3NTIyLCJleHAiOjE3NTU5NjExMjJ9.WTrHHyba88GzXkSJq-_rEqSkTTtXwr2TpvGl6TdPIEg

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU1ODA2MTE4LCJleHAiOjE3NTU4MDk3MTh9.DUHJ9hFTXTd1b_hYXgti3-Oha-sVhbO0d0w1WcEv9EI


const verifyToken = (req, res, next) => {
    console.log('verifyToken called');

    // Ensure variables needed for jwt.verify func are here and not undefined
    console.log('process.env.JWT_SECRET : ', process.env.JWT_SECRET)

    console.log('req.cookies.token : ', req.cookies.token);


    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        console.log('decoded : ', decoded);
        req.user = decoded
        console.log('*verifytoken* && req.user : ', req.user)
    } catch(err) {
        return res.status(500).json({
            "message": "an error occured",
            "err": err
        })
    }

    next();
}


// const verifyToken = (req, res, next) => {
//     console.log('verifyToken called')

//     // console.log('req.user : ', req.user);

//     console.log('req.cookies : ', req.cookies);
//     console.log(req.cookies.token)
//     console.log('hell?')

//     const token = req.cookies.token;
//     console.log('*verifyToken* token : ', token);

//     if(!token) return res.status(401).json({"messsage":"No token in cookies found", "req": req});

//     try {
//         console.log('typeof(token) : ', typeof(token));
//         console.log('process.env.JWT_SECRET : ', process.env.JWT_SECRET);
//         req.user = '5'
//         // console.log('util.inspect(req.client) :', util.inspect(req.client));
//         console.log('req.client : ', req.client);
//         // console.log(jwt.verify());
//         console.log('req.user : ', req.user)
//         req.user = jwt.verify(token, process.env.JWT_SECRET);
//         console.log('Ladies and gentlement we got em')
//         next();
//     } catch(err) {
//         console.log('*verifyToken* caught');
//         return res.status(403).json({"message": "Invalid token", "req": req})
//     }

//     // next();
// }


    // console.log('auth middleware (verifyToken) called');
    // console.log('req.headers : ', req.headers)

    // try {
    //     let token;
    //     let authHeader = req.headers.Authorization || req.headers.authorization

    //     // console.log('req : ', req);
    //     console.log(' 8verifyToken8 req.header : ', req.header);
    //     console.log(' 8verifyToken8 req.headers : ', req.headers);
    //     console.log(' 8verifyToken8 authorization header : ', authHeader)

    //     if (authHeader && authHeader.startsWith("Bearer")) {
    //         token = authHeader.split(" ")[1];

    //         if (!token) {
    //             return res.status(401).json({
    //                 "message": "No token, authorization denied"
    //             })
    //         }

    //         try {
    //             const decode = jwt.verify(token, process.env.JWT_SECRET);
    //             console.log('is there a req.user before we say there is? well we are about to find out. req.user : ', req.user)
    //             req.user = decode;
    //             console.log("The decoded user is : ', req.user")
    //             console.log('after wards, there is a req.user (phew) :', req.user)
    //             next()
    //         } catch (err) {
    //             return res.status(400).json({
    //                 "message": "Token is not valid"
    //             })
    //         }
    //     } else {
    //         console.log('nope, error')
    //         return res.status(500).json({
    //             "message": "Authorization declined because authorization header param didn't start with 'Bearer'",
    //             "req.headers": req.headers
    //         })
    //     }
    // } catch (err) {
    //     console.log('(caught) err : ', err);
    //     return res.status(500).json({
    //         "message": "No authorization header param submitted"
    //     })
    // }
     
// }

export default verifyToken;