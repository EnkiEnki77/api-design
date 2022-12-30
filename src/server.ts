//every API has a specific anatomy.
//The first part of an API is the server. An API is the code that is 
//executed by a server. A server is an app that has no visual 
//representation, and is always running. Servers usually sit in front
//of a db, and facilitate access to that db. Servers operate on a port.
//ports are a virtual place on your computers OS where network connections.
//start and end. Port assist computeers in sortin their network traffic.
//A server must also have an ip address a unique location used to locate
//a server on a network. An ip address helps traffic go to a specific 
//device. Whereas ports allow targeting of specific services or apps
//on a device. 

//routes are a combination of an http method and a url path. They are
//used to locate certain resources or trigger certain actions on an 
//api. 

//For the most part developers can do whatever they want with their
//api's thats why there is specific design patterns to help developers
//be on the same page on how api's should work. REST is an example.

//route handlers are functions that determine what happens when a request 
//is made to the api

//When interacting with a db you should use an ORM, it stands for Object 
//Relational Mapper. It brings an object oriented approach to your db 
//interactions, making things easier. Prisma is the recommended ORM to use. 

//Prisma works best with typescript use this command npm i typescript ts-node @types/node prisma --save-dev
//Then initialize prisma with npx prisma init

//If youre using ts files you should be using es modules, they work when using typescript, because typescript will compile 
//them back down to common modules. 

//install nodemon so your server auto updates itself. npm install nodemon --save-dev
//"dev": "nodemon src/index.ts"


import express from 'express'
import productRouter from './routes/productRouter'
import userRouter from './routes/userRouter'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createUser, signIn } from './handlers/user'

const app = express()

//middleware allows you to change the config of your server. 

//determines what ip addresses can access the api, this config allows all. its basically a preflightcheck, not the same as 
//authentication
app.use(cors())

//middleware should always be at the top of your server if you want it to come before all your handlers. You also dont need a 
//mount path for most middleware, this attaches it to the entire app. mount paths are mostly used for routers. 
//order of things matter in your server, this is because when next is called from a middleware it goes to whatever is next in
// the call stack. That is dependent on what the request was. If it was /api/product, that would be next for example. 
app.use(morgan('dev'))

//allows a client to send json to the server
app.use(express.json())

//allows a client to add a query string or param and express will properly decode it, otherwise it would just be treated like a 
//string
app.use(express.urlencoded({extended: true}))

//you can create your own middleware, in this example it augments the req object, and any handlers that come after it now have 
//asccess to that augmentation.
app.use((req, res, next) => {
    req.shh_secret = 'secret'

    next()
})

//to create middleware with special configuration return a function from a function, passing the config to the first function.

const consoleLogger = (message) => (req, res, next) => {
    req.hello = `Hello from ${message}`
    next()
}

app.use(consoleLogger('console logger'))

//attaches your router api branch back to app, none of the routes in the router will work unless /api is put first though, because
//that is how the branch is configured in app.use in this instance. 
//app.use allows you to add some sort of configuration either to the whole app, or to a specific api branch such as below. It is
//also used to connect middleware to your app.
app.use('/api', protect, productRouter)

app.use(userRouter)

export default app