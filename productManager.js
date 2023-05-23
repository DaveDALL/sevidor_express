const fs = require('fs')

class ProductManager {
    constructor (path) {
        this.products = []
        this.path = path
    }
    async #readingFile () {
        let fileEXistCheck = fs.existsSync(this.path)
        if(fileEXistCheck) {
            try {
                let p = await fs.promises.readFile(this.path, 'utf-8')
                if(p.length > 0) {
                    return JSON.parse(p)
                }else return []
            }catch (err) {
                console.log("Error en la lectora del archivo...")
            }
        }else return []
    }
    async #findItem (code) {
        this.products = await this.#readingFile()
        if(this.products.length > 0) {
            return this.products.find(product => product.code === code)
        }else {
            return false
        }
    }
    async #findItemId(id) {
        this.products = await this.#readingFile()
        if(this.products.length > 0) {
            return this.products.find(product => product.id === id)
        }else return false 
    }
    #idFiltering (id) {
        return this.products.filter(product => product.id === id)
    }
    #idGenerator () {
        return Date.now().toString(36) + Math.random().toString(16)
    }
    async #productPush (id, p) {
        this.products.push({id: id, code: p.code, title: p.title, description: p.description, thumbnail: p.thumbnail, price: p.price, stock: p.stock})
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
        }catch (err) {
            console.log("Error al escribir el Archivo...")
        }
    }
    async addProduct (newProduct) {
        if(newProduct.code && newProduct.title && newProduct.description && newProduct.thumbnail && newProduct.price && newProduct.stock) {
            let itemFound = await this.#findItem(newProduct.code)
            if(itemFound) {
                console.log("El Producto ya se encuentra Registrado...")
            } else {
                let id = this.#idGenerator()
                this.#productPush(id, newProduct)
            }
        } else {
            console.log("debe introducir un producto con todos los campos requeridos: Código, Nombre, Descripción, Enlace a la imagen, Precio y Stock")
        }
    }
    async getProducts () {
        this.products = await this.#readingFile ()
        return this.products
    }
    async getProductById (id) {
        let itemFound = await this.#findItemId(id)
        if (itemFound) {
            let idFoundProduct = this.#idFiltering(id)
            return idFoundProduct
        } else {
            console.log("No se encoentró el Producto...")
            return []
        }
    }
    async deleteProductById (id) {
        let ps = await this.#readingFile()
        if(ps.length > 0) {
            let modifiedProducts = ps.filter(p => p.id !== id)
            if(modifiedProducts.length > 0) {
                this.products = [...modifiedProducts]
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
                console.log("El producto se borro Exitosamente...")
            }else console.log("No existe el ID solicitado para borrar...")
        }else console.log("El archivo de productos se encuentra vacio....")
    }
    async updateProduct (producToModify) {
        if(producToModify.id && producToModify.code && producToModify.title && producToModify.description && producToModify.thumbnail && producToModify.price && producToModify.stock) {
            let itemFound = await this.getProductById(producToModify.id)
            if(itemFound.length > 0) {
                let ps = await this.#readingFile()
                this.products = ps.map(p => {
                    if(p.id === producToModify.id) {
                        return {...p, code: producToModify.code, title: producToModify.title, description: producToModify.description, thumbnail: producToModify.thumbnail, price: producToModify.price, stock: producToModify.stock}
                    } else return p
                })
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
            }else console.log("No existe el producto con el ID a modificar...")
        }else console.log("el producto no cuenta con los campos completos...")
    }
}

module.exports = ProductManager
