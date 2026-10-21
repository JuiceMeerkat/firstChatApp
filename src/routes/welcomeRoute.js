import express from "express"
import { serveHomepage, serveDashboard } from "../middleware/rootPageMW.js";
import jwt from "jsonwebtoken"; 
import { softAuth } from "../middleware/softAuth.js";


const router = express.Router();

router.get('/', softAuth, (req, res, next) => {
    console.log('*checkForToken* called');
    
    // Ensure variables needed for jwt.verify func are here and not undefined
    console.log('process.env.JWT_SECRET : ', process.env.JWT_SECRET)
    console.log('req.cookies.token : ', req.cookies.token);

    const secret = process.env.JWT_SECRET;
    const token = req.cookies.token;
    console.log('token : ', token);

    if (!token) {
        console.log('no token provided')
        return serveHomepage(req, res);
        console.log('after serveHomepage')
        // return res.status(500).json({
        // "message": "It worked, but not yet ready"})
        console.log('after return res.status')
    
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded : ', decoded);
        req.user = decoded
        console.log('*verifytoken* && req.user : ', req.user)
        return serveDashboard(req, res);
    //     return res.status(500).json({
    //     "message": "It worked, but not yet ready"
    // })
    } catch(err) {
        console.log('err : ', err);
        return serveHomepage(req, res);
        return res.status(500).json({
        "message": "It worked, but not yet ready"
    })
    }

    next();
    
})

// router.get('/', intercept, verifyToken, async(req, res) => {

//     console.log('*WelcomeRoutes* req.user : ', req.user);
//     try {
//         const {id} = req.user;
//         console.log('id : ', id);
//         const result = await pool.query(`
//             SELECT * 
//             FROM "users"
//             WHERE id = $1`, [id]);

//         const user = result.rows[0];

//         console.log('user : ', user);

//         return res.render('pages/homepage/index.ejs', {
//             name: user.name,
//             role: user.role,
//             email: user.email
//         })
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send("Error loading dashboard");
//     }

// });


    // res.sendFile('home.html', { root: './html'})
    // res.sendFile('../../html/home.html')

    // const host = process.env.HOST;
    // const port = process.env.PORT;

    // console.log('host, port : ', host, port);
    // // const response = await fetch('')

    // console.log('req.user : ', req.user)

    // // res.render('../../views/pages/homepage/index.ejs');
    // const options = {name: "corin",
    //     role: "admin",
    //     email: "corin@gmail.com"
    // }
    // res.render('pages/homepage/index.ejs', options);

    // return 1
    // return  res.render('pages/homepage/index.ejs', options);


export default router;