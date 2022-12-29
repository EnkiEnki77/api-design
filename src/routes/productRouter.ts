//you should utilize a router to make different branches within your api that may or may not have different configuration from 
//each other. 

//the reason why REST is not optimal for projects where you are also building the client, is because it is likely you will have 
//a page that requires many resources, and that means one page will be making multiple api calls. 
//Rest is useful for when you are making a public API where you dont know what the implementation would be, so its beneficial to 
//be more general. 

import {Router} from 'express'

const router = Router()

//the app is the main api, these routes are just a sub branch, so you need to reattach them to app.  

//middleware are functions that run right before your route handlers run. They can do things like authenticate, log, augment the 
//request, handle errors, etc. They look exactly like middleware except for one difference, because there can be a list of 
//middleware, you need a way to move into the next middleware when work is done in the current. Looks like this:

const middleWare = (req, res, next) => {

    //this tells express work is done and its time to move on to the next middleware or a handler. 
    next()}

   

// Product

//you can add middleware to specific  route
router.get('/product', (req, res, next) => {
    req.shh = 'secrettttt'
    next()
}, (req, res) => {
    res.json({message: req.shh + ' ' + req.hello})
})

router.get('/product/:id', (req, res) => {})

router.post('/product', (req, res) => {

})

router.put('/product/:id', (req, res) => {})

router.delete('/product/:id', (req, res) => {})

// Update

router.get('/update', (req, res) => {})

router.get('/update/:id', (req, res) => {})

router.post('/update', (req, res) => {})

router.put('/update/:id', (req, res) => {})

router.delete('/update/:id', (req, res) => {})

// Update Point

router.get('/updatepoint', (req, res) => {
    res.json({message: 'hello from update point'})
})

router.get('/updatepoint/:id', (req, res) => {})

router.post('/updatepoint', (req, res) => {})

router.put('/updatepoint/:id', (req, res) => {})

router.delete('/updatepoint/:id', (req, res) => {})

export default router

