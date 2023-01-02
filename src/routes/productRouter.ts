//you should utilize a router to make different branches within your api that may or may not have different configuration from 
//each other. 

//the reason why REST is not optimal for projects where you are also building the client, is because it is likely you will have 
//a page that requires many resources, and that means one page will be making multiple api calls. 
//Rest is useful for when you are making a public API where you dont know what the implementation would be, so its beneficial to 
//be more general. 

import {Router} from 'express'

import {body, oneOf, validationResult} from 'express-validator'
import { handleValidationErrors } from '../modules/middleware'
import { alterProduct, createProduct, deleteProduct, getOneProduct, getProducts } from '../handlers/product'

const router = Router()

//the app is the main api, these routes are just a sub branch, so you need to reattach them to app.  

//middleware are functions that run right before your route handlers run. They can do things like authenticate, log, augment the 
//request, handle errors, etc. They look exactly like middleware except for one difference, because there can be a list of 
//middleware, you need a way to move into the next middleware when work is done in the current. Looks like this:

const middleWare = (req, res, next) => {

    //this tells express work is done and its time to move on to the next middleware or a handler. 
    next()}

   

// Product

router.get('/product', getProducts)

router.get('/product/:id', getOneProduct)

//the body middleware is saying req.body should have a property called name. Its enhancing the req object, so that when you 
//pass it to validationResult it knows what validations to be checking for. Vallidations should only occur for data that the user
//is required to send up. If a property has a default or a ? it is not required.
router.post('/product', body('name').isString(), handleValidationErrors, createProduct)

router.put('/product/:id', body('name').isString(), handleValidationErrors, alterProduct)

router.delete('/product/:id', deleteProduct)

// Update

router.get('/update', (req, res) => {})

router.get('/update/:id', (req, res) => {})

router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(),   
    handleValidationErrors, 
    (req, res) => {
        res.json({message: "product updated."})
})

router.put('/update/:id', 
    body('title').optional().isString(), 
    body('body').optional().isString(), 
    body('status').isIn(['IN_PROGRESS', 'DEPRECATED','SHIPPED']), 
    body('version').optional().isString(), 
    handleValidationErrors, 
    (req, res) => {
        res.json({message: "product updated."})
})

router.delete('/update/:id', deleteProduct)

// Update Point

router.get('/updatepoint', (req, res) => {
    res.json({message: 'hello from update point'})
})

router.get('/updatepoint/:id', (req, res) => {})

router.post('/updatepoint', 
    body('name').exists().isString(), 
    body('description').exists().isString(), 
    body('updateId').exists().isString(),
    handleValidationErrors, (req, res) => {})

router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(), 
    handleValidationErrors, (req, res) => {})

router.delete('/updatepoint/:id', (req, res) => {})

export default router

