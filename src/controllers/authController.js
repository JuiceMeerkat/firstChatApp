import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// Model imports
import { getUserByUsername } from "../models/userModel.js";
import { response } from "express";

export const register = async (req, res) => {
    console.log('*register* called')
    console.log('req : ', req);
    console.log('JUST AFTER')
    // while (1) {}
    console.log('req.body.username : ', req.body.username)
    const { username, email, password} = req.body;
    console.log('username, email, password : ', username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    
    try {
        console.log('before result in register func')
        const result = await pool.query(`
            INSERT INTO users (username, email, password, role) 
            VALUES ($1, $2, $3, $4)
            `, [username, email, hashedPassword, 'user']);
        console.log('after result in register func')
        return res.status(200).json({
            'status': 200,
            'message': `Register successful. Thank you, ${username}, you may now sign in`
        });
        // return res.status(200).json({
        //     "message": "User created successfully",
        //     "result": result
        // })
    } catch(err) {
        console.log('reached catch(err) in register authController')
        if (err.code === '23505') { // unique_violation
            console.log("Email already exists")
            // const conflictError = new Error("Email already exists");
            // conflictError.status = 409; // 409 Conflict
            // throw conflictError;
            res.status(409).json({
                'status': 409,
                'message': `An error occured, the email ${email} is already registered with another account.`
            })
        }
        throw err;
    }

};


export const login = async(req, res) => {

    console.log('*login** req.body : ', req.body);
    try {
        console.log('got to beginning?')
        const {username, password} = req.body;

        console.log('username, password : ', username, password);

        // refer to the user model to get a user by their username
        const response = await getUserByUsername(username);
        console.log('LOGIN response : ', response);

        if (!response) {
            return res
            .status(404)
            .json({ message: `User with username : ${username} was not found, refresh page to try again` });
        }
        
        // const result = response.rows[0];
        const user = response;
        // console.log('result : ', result);
        console.log('user : ', user);
        console.log('user.password : ', user.password);
        console.log('password : ', password);
        
        console.log('user : ', user)
        if (!user) {
            return res.status(404).json({message:`User with username : ${username} was not found, refresh page to try again`})
        }

        console.log('got to making isMatch?')
        console.log(await bcrypt.compare(password, user.password))

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('got to just after const isMatch')
        if(!isMatch) {
            return res.status(400).json({
                "message":`Invalid credentials, refresh page to try again`
            })
        }

        console.log('got to making token?')

        const token = jwt.sign(
            {id:user.id, role: user.role, username:user.username}, 
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
        console.log('*login* token : ', token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, //turn on if protocol changes to https
            sameSite: "strict"
        })

        
        
       return res.redirect('/')

    } catch(err) {
        return res.status(500).json({"error":"Something went wrong (so 500 code being bothered bcos tutorial could cba working it out)",
            "message": err.message,
            "status": err.status
        })
        
    }
};


export const signout = (req, res) => {

    res.clearCookie('token')
    res.redirect('/');
    console.log('redirecteeeeeed to home page ')
};
