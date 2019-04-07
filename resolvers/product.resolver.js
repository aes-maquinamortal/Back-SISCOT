const ProductModel = require('../models/product.model');

module.exports = {
    products: async (args, req) => {
        const products = await ProductModel.query();
        return products;
    },

    createProduct: async (args, req) => {
        const product = await ProductModel.query().insert(args.productInput);
        return product;
    }
}