import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/Users";

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
} // Extendemos la interfaz Request de Express para incluir el usuario autenticado

export const authValidation = async (req: Request, res: Response, next: NextFunction)=> {
    const bearer = req.headers.authorization
    if (!bearer){
        const error= new Error ('Authorization token required');
        return res.status(401).json({ error: error.message })
    }
    
    const [, token]= bearer.split(' ') // Desestructuracion de array, convertimos el string en un array, e ignoramos el primer elemento 
    if (!token){
        const error= new Error ('Token no sent, Not Authorized')
        return res.status(401).json({ error: error.message })
    }
    
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        
        if (typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('-password')
            
            if (!user){
                const error = new Error ('Invalid User')
                return res.status(404).json({ error: error.message })
            }
            req.user = user //Asignamos el usuario encontrado a la propiedad user del objeto req
            next()
        }
        
    } catch (error) {
        res.status(501).send('No valid token')
    }
}