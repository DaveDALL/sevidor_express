const express = require('express')
const ProductManager = require('./productManager.js')

const app = express()
app.use(express.urlencoded({extended:true}))
let productsDb = new ProductManager('./products.json')

app.get('/products', async (req, res) => {
    let limit = req.query.limit
    let ps = await productsDb.getProducts()
    if(!limit || limit > ps.length) {
        try{
            let products = [...ps]
            res.send({products})
        }catch(err) {
            console.log('Mediante GET no puede Leer el archvio de productos...')
        }
    }else {
        try {    
            if(limit > 0) {
                let products = ps.filter((p, i) => i < limit)
                res.send({products})
            }else {
                res.send({error: "El limite es menor o igual a cero..."})
            }
        }catch(err) {
            console.log('Mediante GET no puede Leer el archvio de productos...')
        }
    }
})

app.get('/products/:id', async (req, res) => {
    let id = String(req.params.id)
    try {
        let product = await productsDb.getProductById(id)
        if(product.length > 0) {
            res.send({product})
        }else {
            res.send({error: "No existe el producto con el ID solicitado..."})
        }
    }catch(err) {
        console.log('Mediante GET no puede Leer el archvio de productos...')
    }
})

app.listen(8080, () =>{
    console.log('Server running on port 8080')
})