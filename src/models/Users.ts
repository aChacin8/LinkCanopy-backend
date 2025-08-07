import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document { //Interfaz de Usuario se extiende del Document de mongoose, es decir, podemos usar los metodos de mongoose
    handle: string,
    firstName: string,
    lastName: string,
    phone: string, 
    email: string,
    password: string,
    description?: string
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
    description: {
        type: String,
        required: false,
        default: ''
    }
})

const User = mongoose.model<IUser>('User',userSchema) //El modelo de Usuarios con el generic
export default User