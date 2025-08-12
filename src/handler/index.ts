import { Request, Response } from "express"; //Para evitar el any en req y res
import slug from 'slug'
import formidable from 'formidable'

import User from "../models/Users";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import cloudinary from "../config/cloudinary";
import { generateId } from "../config/crypto";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, phone } = req.body

        const userExist = await User.findOne({ email }) //findOne es como un Where
        if (userExist) {
            const error = new Error('This email is already registered')
            res.status(409).json({ error: error.message })
        }

        const handle = slug(req.body.handle, '')
        const handleExist = await User.findOne({ handle })
        if (handleExist) {
            const error = new Error('Username not available')
            res.status(409).json({ error: error.message })
        }

        const phoneExist = await User.findOne({ phone })
        if (phoneExist) {
            const error = new Error('This phone is already registered')
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

export const getUser = async (req: Request, res: Response) => {
    return res.json(req.user)
}   

export const updateInfo = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body 

        const handle = slug (req.body.handle, '')
        const handleExist = await User.findOne({ handle})

        if (handleExist && handleExist.email !== req.user.email) {
            const error = new Error ('Username not available')
            return res.status(409).json({ error: error.message })
        }

        req.user.description = description;
        req.user.links = links;
        req.user.handle = handle;

        await req.user.save()
        res.status(200).send('Profile updated successfully')

    } catch (error) {
        const err = new Error ('Bad Syntax, try again')
        res.status(500).json({ error: err.message })
    }
}

export const updloadImage = async (req: Request, res: Response) => {
    try {
        const form = formidable({multiples: false}) //Solo se puede subir una imagen
        form.parse(req, (err, fields, files) => {
            cloudinary.uploader.upload(files.file[0].filepath, {public_id: generateId()}, async (err, result) => {
                if (err) {
                    const err = new Error ('An Error has been ocurred trying to upload image')
                    res.status(401).json({ error: err.message})
                } 

                if(result){
                    req.user.img = result.secure_url
                    await req.user.save()
                    res.json({ img: result.secure_url})
                }
            })
        })
    } catch (error) {
        const err = new Error ('Bad Syntax,  try again')
        res.status(500).json({ error: err.message })
    }
}