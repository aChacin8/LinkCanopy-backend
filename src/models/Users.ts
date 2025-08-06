import mongoose, { Schema } from "mongoose";

export interface IUser {
    handle: string,
    firstName: string,
    lastName: string,
    phone: string, 
    email: string,
    password: string,
} //La interface funciona como espejo

const userSchema = new Schema ({ 
    handle: {
        type: String,
        required: true,
        trim: true, //Eliminacion automatica de espacios en blanco
        lowercase: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true, 
        trim: true//Si un usario agrega un nombre con espacios en blanco, elimina estos
    },
    lastName: {
        type: String,
        required: true, 
        trim: true//Si un usario agrega un nombre con espacios en blanco, elimina estos
    },
    phone: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
})

const User = mongoose.model<IUser>('User',userSchema) //El modelo de Usuarios con el generic
export default User