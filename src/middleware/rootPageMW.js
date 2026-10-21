// import { use } from "react";
import pool from "../config/db.js";

export const serveDashboard = async (req, res) => {
    console.log('*serveDashboard*')
    // console.log('req.user : ', req.user)
    const {id} = req.user;
    console.log('id : ', id);
    const result = await pool.query(`
        SELECT * 
        FROM "users"
        WHERE id = $1`, [id]);

    const user = result.rows[0]
    console.log('user : ', user);
    return res.render('pages/homepage/tokenIndex.ejs', {
            name: user.username,
            role: user.role,
            email: user.email,
            id: user.id,
            user: res.locals.user
        });

    return 1
}

export const serveHomepage = (req, res) => {
    console.log('*serveHomepage*')
    return res.render('pages/homepage/noTokIndex.ejs', {
        user: res.locals.user
    })
}