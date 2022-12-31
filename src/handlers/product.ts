import prisma from "../db"

//writing these handlers can sometimes change how you index things in your schema, to make it easier to retrieve the data you need.

export const getProducts = async (req, res) => {
    //two different ways to query for all the products that belong to a user. 


    const userProducts = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        }
    })

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
    
    //you should always send back an object with a data property so that what the client recieves is always the same shape.
    //this also allows you to send back more than just the data, such as errors
    res.json({data: userProducts})
}

export const getOneProduct = async (req, res) => {
    //the reason we have to use findFirst for this combo, is because product is not indexed, which has the db convinced that there
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
}

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })

    res.json({message: `${product.name.slice(0, 1).toUpperCase() + product.name.slice(1)} added to ${req.user.name}'s products`})
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

    res.json({message: `${deleted} deleted from ${req.user.name}'s products.`})
}