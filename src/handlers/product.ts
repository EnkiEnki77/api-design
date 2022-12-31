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
    const product = await prisma.product.findUnique({
        where: {
            id: req.params.id
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

    res.json(product)
}

export const alterProduct = async (req, res) => {
    const product = await prisma.product.update({
        where: {
        
        }, 
        data: {

        }
    })

    res.json(req)
}