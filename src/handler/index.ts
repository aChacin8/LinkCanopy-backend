import { Request, Response } from "express"; //Para evitar el any en req y res
import slug from 'slug'

import User from "../models/Users";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { authValidation } from "../middlewares/authValidation";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const userExist = await User.findOne({ email }) //findOne es como un Where
        if (userExist) {
            const error = new Error('This email is already registered')
            res.status(409).json({ error: error.message })
        }

        const fullName = req.body.firstName + ' ' + req.body.lastName
        const handle = slug(fullName, '')
        const handleExist = await User.findOne({ handle })
        if (handleExist) {
            const error = new Error('Username not available')
            res.status(409).json({ error: error.message })
        }

        const user = new User(req.body)
        user.password = await hashPassword(password)
        user.handle = handle //Asignar el handle al usuario
        
        await user.save()

        res.status(201).send('User Created')
    } catch (error) {
        res.status(400).send ('Bad Syntax, try again')
    }
}

export const loginUser = async( req: Request, res: Response) => {
    
        try {
            const { email, password } = req.body
        
            const user = await User.findOne({email})
            if (!user){
                const error = new Error ('User not found')
                return res.status(401).json({ error: error.message })
            }
        
        const isPasswordOk = await checkPassword(password, user.password)
        if(!isPasswordOk){
            const error = new Error ('Incorrect password')
            return res.status(401).json({ error: error.message })
        }
        const token = generateToken ({id: user._id, handle: user.handle})
        res.status(200).send(token)
        
        } catch (error) {
            res.status(400).send('Bad Syntax, try again')
        }
    
}

export const getUser = async (req: Request, res: Response)=> {
    console.log(req.user);
    return res.json(req.user)
}   