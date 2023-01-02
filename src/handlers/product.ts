import prisma from "../db"

//writing these handlers can sometimes change how you index things in your schema, to make it easier to retrieve the data you need.

//if your handlers end up throwing an error it will break your server, if you dont handle them. If its a synchronous error, express
//will catch it for you if you want tho.

//for async errors you have to tell your handlers there is an error, you can use next for this. If you pass anything to next it 
//treats it like an error. 
export const getProducts = async (req, res, next) => {
    //you need a try catch for every individual async operation in a handler.

    try{
        const userProducts = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            }
        })

        //you should always send back an object with a data property so that what the client recieves is always the same shape.
        //this also allows you to send back more than just the data, such as errors
        res.json({data: userProducts})
    }catch(e){
        next(e)
    }

    try{
        const user = await prisma.user.findUnique({
            //if doing a query in prisma use where, its like using filter.
            where: {
                id: req.user.id,
            },
            //to include relationship data in a query use this include property. 
            include:{
                products: true
            }
        })
    }catch(e){

    } 
}

export const getOneProduct = async (req, res, next) => {
    try{//the reason we have to use findFirst for this combo, is because product is not indexed, which has the db convinced that there
    //could be more than one item with this combo of queries. 
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            //when allowing users to query for things based on id, make sure it only shows things scoped to them if its meant to be 
            //info specific to them. 
            belongsToId: req.user.id
        }
    })

    res.json({data: product})
    }catch(e){
        next(e)
    }
}

export const createProduct = async (req, res, next) => {
    try{const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })

    res.json({message: `${product.name.slice(0, 1).toUpperCase() + product.name.slice(1)} added to ${req.user.name}'s products`})
    }catch(e){
        next(e)
    }
}

export const alterProduct = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            belongsToId: req.user.id,
            id: req.params.id
        }    
    })

    const updated = await prisma.product.update({
        where: {
            id: product.id,
        },
        data: {
            name: req.body.name
        }
    })

    res.json({data: updated})
}

export const deleteProduct = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    const deleted = await prisma.product.delete({
        where: {
            id: product.id,
        }
    })

    res.json({message: `${deleted.name} deleted from ${req.user.name}'s products.`})
}