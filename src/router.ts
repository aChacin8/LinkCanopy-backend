import { Router } from "express";
import { body } from "express-validator"; 
import { createUser, getUser, loginUser, updateInfo } from "./handler";
import { inputErrors } from "./middlewares/validation";
import { authValidation } from "./middlewares/authValidation";

const router = Router()

router.post('/auth/register',
            body('handle')
                .notEmpty()
                .withMessage('Handle cannot be empty'),
            body('firstName')
                .notEmpty()
                .withMessage('First Name cannot be empty'),
            body('lastName')
                .notEmpty()
                .withMessage('Name cannot be empty'),
            body('email')
                .isEmail()
                .withMessage('Email is not valid'),
            body('password')
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                })
                .withMessage('Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one number, and one symbol'),  
                inputErrors,         
            createUser
        )

router.post('/auth/login', 
            body('email')
                .notEmpty()
                .withMessage('Email is not valid'),
            body('password')
                .notEmpty()
                .withMessage('Password cannot be empty'),
            inputErrors,
            loginUser
)

router.get('/user', authValidation, getUser)

router.patch ('/user', 
            body('handle')
                .notEmpty()
                .withMessage('Handle cannot be empty'),
            authValidation, updateInfo)

export default router