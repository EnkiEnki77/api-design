import prisma from "../db";
import { comparePassword, createJWT, hashedPassword } from "../modules/auth";

// you dont want your handlers to think about any sort of auth or validation, middlewaare should handle this before 
//the handlers even run. 

//install express-validator for validations. 

//when creating a validator think about what you would and wouldnt allow a user to update on your database by looking at your models.



//all routes that query a db need to be asynce
export const createUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashedPassword(req.body.password)
        }
    })

    const token = createJWT(user)
    res.json({token})
}


export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, user.password)

    if(!isValid) {
        res.status(401)
        res.json({message: "Invalid password"})
    }

    const token = createJWT(user)
    res.json({token})
    
}