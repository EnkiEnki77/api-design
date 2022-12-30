import { PrismaClient } from "@prisma/client";

//to look at your db type npx prisma studio

//You should never trust the input of the user. If you build your app assuming everything will be okay than it will break. 
//Just like you might do some sort of form validation on the frontend, you do the same on the backend for user input before
//you start interacting with the db. Any routes where a user sends something to the db needs validation. 

//Try to functionalize different pieces of logic as much as possible, so its more scalable and reusable. Handlers should not contain 
//validation logic for example, that should be extracted into a function, so it can be reused in other handlers. 
const prisma = new PrismaClient()

export default prisma