import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import jwt from 'jsonwebtoken'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname((__filename));
const parentDirectory = path.resolve(__dirname, '..');//go to parent directory


// Now you can access the json function from the bodyParser object
import User from "../models/User.js"

const errorHandler = (err) => {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""}

    if(err.message === "incorrect password") {
        errors.password = "That password is incorrect"
        return errors;
    }

    if(err.message === "incorrect email") {
        errors.email = "That email is not registered"
        return errors;
    }

    if(err.code === 11000) {
        errors.email = "This email is already registered"
        return errors;
    }
    
    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, "thisismysecret", {
        expiresIn: maxAge
    });
}

//---------------------------------------------------------login get-------------------------------------
export function login_get(req, res) {
    res.sendFile(parentDirectory + "/views/login.html")
}
//---------------------------------------------------------login post-------------------------------------
export async function login_post(req, res) {
    const{email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id})
    } catch (error) {
        const errors = errorHandler(error)
        res.status(400).json({errors})
    }
}
//---------------------------------------------------------signup get-------------------------------------

export function signup_get(req, res) {
    
    res.sendFile(parentDirectory + "/views/signup.html")
}

//---------------------------------------------------------sigup post-------------------------------------

export async function signup_post(req, res) {
    const{email, password} = req.body
    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json( {errors});
    }
}

export function logout_get(req, res) {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/")
}
