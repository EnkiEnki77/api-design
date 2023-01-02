
import { body, validationResult } from 'express-validator'

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400)
        res.json({ errors: errors.array() })
        return
    } else {
        next()
    }
}


//error handlers take 4 arguments, and for them to catch errors they have to come after the route handlers. 
//think about why something would break, and handle the error appropriately.
//for errors outside express but still in node, use process.on to catch them. uncaughtException is for sync and
//unhandledRejection async. 
export const handleRouteErrors = (error, req, res, next) => {
    if(error.type == 'auth'){
        res.status(401)
        .json({ message: 'unauthorized' })
    }else if(error.type == 'input'){
        res.status(400)
        .json({ message: 'Invalid input' })
    }else{
        res.status(500)
        .json({ message: 'server error' })
    }
}

