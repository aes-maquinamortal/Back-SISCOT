const ProductModel = require('../models/product.model');
const ProvProductoModel = require('../models/prov_producto.model');

module.exports = {
    products: async (args, req) => {
        let products = await ProductModel.query();
        if(args.proveedorid) {
            // TODO: make query for retrieving products created by one supplier
        }
        return products;
    },

    createProduct: async (args, req) => {
        let product = await ProductModel.query()
            .where('referencia', args.productInput.referencia);

        if (product.length === 0) {
            product = await ProductModel.query().insert(args.productInput);
        } else {
            product = product[0];
        }

        await ProvProductoModel.query().insert({
            proveedorid: null,
            productoid: product.id
        })
        
        return product;
    }
}