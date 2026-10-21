import { serveDashboard, serveHomepage } from "./rootPageMW.js";

const checkForToken = (req, res, next) => {
    console.log('*checkForToken* called');
    
    // Ensure variables needed for jwt.verify func are here and not undefined
    console.log('process.env.JWT_SECRET : ', process.env.JWT_SECRET)
    console.log('req.cookies.token : ', req.cookies.token);

    const secret = process.env.JWT_SECRET;
    const token = req.cookies.token;
    console.log('token : ', token);

    if (!token) {
        console.log('no token provided')
        serveHomepage(req, res);
        return res.status(500).json({
        "message": "It worked, but not yet ready"
    })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded : ', decoded);
        req.user = decoded
        console.log('*verifytoken* && req.user : ', req.user)
        serveDashboard(req, res);
        return res.status(500).json({
        "message": "It worked, but not yet ready"
    })
    } catch(err) {
        console.log('err : ', err);
        serveHomepage();
        return res.status(500).json({
        "message": "It worked, but not yet ready"
    })
    }

    next();
    
}

export default checkForToken;