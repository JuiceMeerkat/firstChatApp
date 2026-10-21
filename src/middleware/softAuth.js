import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET : ', JWT_SECRET);

export const softAuth = (req, res, next) => {
    console.log('softAuth MIDDLEWARE called')
    // This func will change the res to include the decoded payload of the jwt if the user is signed in, and not if they are not. This is so the EJS on the client end know which header to load when the web page is being loaded.

    console.log('req.cookies.token : ', req.cookies.token);

    try {
        const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET);
        console.log('decodedToken : ', decodedToken);

        res.locals.user = decodedToken;
        console.log('res.locals.user : ', res.locals.user);
    } catch(err) {
        console.log("err : ", err);
    }





    next()
}