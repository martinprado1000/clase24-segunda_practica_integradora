const {Router} = require('express')
const ProductManager = require('../managers/ProductManager')
const productsRouter = Router()
const productManager = new ProductManager()


productsRouter.get('/', async(req, res) => {
    const products = await productManager.getAllProducts()
    
    res.json(products);
})

productsRouter.get('/:pid',async (req, res) => {
    const pid = req.params.pid
    const product=await productManager.getProductById(pid)
    return res.json(product)
})

productsRouter.post('/', async (req, res) => {
    const body = req.body

    const product = await productManager.addProduct(body)

    return res.status(201).json(product)

})

productsRouter.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const body = req.body
    const product = await productManager.updateProduct(pid, body)

    return res.json(product)
})


productsRouter.delete('/:pid', async (req, res) => {
    const pid = req.params.pid

    try {
        const product = await productManager.deleteProduct(pid)
    
        return res.json(product)

    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }

})

module.exports = productsRouter