import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'


//its important that not just anyone be allowed to use our api. we need to be able to tell what user is making the request, so 
//we can scope their queries and writes to the user. We dont want one user having access to anothers data. To ensure this you have
//to protect your api. Using tokens such as a jwt is great for this. some other examples are api keys or usin session. 

//a jwt is a javascript object that using a secret can be converted to a random string, and given that same secret be converted back.
//the jwt is stored on the client that creates it and it is sent to the server with every request for auth purposes. 

//jwt should contain any unique data pertaining to a user. 

//you should store your jwt's in a cookie on client side. 
//on server side jwt's should be stored on an authorization header. 

export const createJWT = (user) => {
    const token = jwt.sign({id: user.id, name: user.username}, process.env.JWT_SECRET);

    return token
}

 //you should create a middleware that protects certain routes if a user doesnt have a jwt. 

 export const protect = (req, res, next) => {
    //headers are key values and are another configuration option for your requests. Its like the meta data of an html file. 
    //its not the actual data sent through the request, but is data about the request. Bearer tokens are generally passed through
    //the authorization header. 
    const bearer = req.headers.authorization 

    //This checks that a bearer token is passed in the headers
    if(!bearer){
        //401 is status code for not authorized
        res.status(401)
        res.json({message: 'not authorized'})
        return 
    }

    const [, token] = bearer.split(' ')
    //This checks the token is actually valid. 
    if(!token){
        //401 is status code for not authorized
        res.status(401)
        res.json({message: 'not valid token.'})
        return 
    }



    //now we must verify that the bearer token is actually a proper jwt that matches the secret.
    //this should be wrapped in a try catch, because we dont want the jwt method breaking the server based on user error. 

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        console.log(user, bearer)
        next()
        return
    }catch(e){
        console.error(e)
        res.status(401)
        res.json({message: 'not valid token.'})
        return 
    }
 }

 //takes in a string password from the client and compares it to the hashed password on the db
 export const comparePassword = (password: string, hash: string) => {
    //returns a promise that resolves to true or false
    return bcrypt.compare(password, hash)
 }

 //hashes password so that users sensitive data is not at risk, and then stores hashed password on the db.
 export const hashedPassword = (password: string) => {
    //you should always add a slat to your hash, this makes it harder to guess. 
   return bcrypt.hash(password, 5)
 }