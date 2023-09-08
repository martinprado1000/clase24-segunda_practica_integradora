const productModel = require('../models/productModels')

class ProductManager {
    constructor() {
        this.model = productModel
    }

    async getAllProducts() {
        const products = await this.model.find()

        return this.mapProducts(products)
    }

    mapProducts (products) {
        return products.map(p => {
            const productObj = p.toObject()
            productObj.id = productObj._id
            delete productObj._id

            return productObj
        })
    }

    async getProductById(id) {
        return this.model.findById(id)
    }

    async addProduct(body) {
        return this.model.create({
            code: body.code,
            stock: body.stock,
            title: body.title,
            price: body.price
        })
    }

    async updateProduct(id, body) {
        const product = await this.getProductById(id)

        if (!product) {
            throw new Error('Producto no existe')
        }

        const productUpdated = {
            _id: product._id,
            code: body.code || product.code,
            stock: body.stock || product.stock,
            title: body.title || product.title,
            price: body.price || product.email
        }

        await this.model.updateOne({ _id: id }, productUpdated)

        return productUpdated
    }

    async deleteProduct(id) {
        const product = await this.model.findById(id)

        if (!product) {
            throw new Error('Producto no existe')
        }

        await this.model.deleteOne({ _id: id })

        return true
    }

}

module.exports = ProductManager