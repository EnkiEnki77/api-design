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
import router from './router'

const app = express()

//attaches your router api branch back to app, none of the routes in the router will work unless /api is put first though, because
//that is how the branch is configured in app.use in this instance. 
//app.use allows you to add some sort of configuration either to the whole app, or to a specific api branch such as below. It is
//also used to connect middleware to your app.
app.use('/api', router)

export default app