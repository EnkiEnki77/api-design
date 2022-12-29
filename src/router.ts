//you should utilize a router to make different branches within your api that may or may not have different configuration from 
//each other. 

//the reason why REST is not optimal for projects where you are also building the client, is because it is likely you will have 
//a page that requires many resources, and that means one page will be making multiple api calls. 
//Rest is useful for when you are making a public API where you dont know what the implementation would be, so its beneficial to 
//be more general. 

import {Router} from 'express'

const router = Router()

//the app is the main api, these routes are just a sub branch, so you need to reattach them to app.     

// Product

router.get('/product', (req, res) => {})

router.get('/product/:id', (req, res) => {})

router.post('/product', (req, res) => {})

router.put('/product/:id', (req, res) => {})

router.delete('/product/:id', (req, res) => {})

// Update

router.get('/update', (req, res) => {})

router.get('/update/:id', (req, res) => {})

router.post('/update', (req, res) => {})

router.put('/update/:id', (req, res) => {})

router.delete('/update/:id', (req, res) => {})

// Update Point

router.get('/updatepoint', (req, res) => {})

router.get('/updatepoint/:id', (req, res) => {})

router.post('/updatepoint', (req, res) => {})

router.put('/updatepoint/:id', (req, res) => {})

router.delete('/updatepoint/:id', (req, res) => {})

export default router

