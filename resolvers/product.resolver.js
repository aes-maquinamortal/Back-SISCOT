const ProductModel = require('../models/product.model');
const ProvProductoModel = require('../models/prov_producto.model');

module.exports = {
    products: async (args, req) => {
        let products = [];
        if(args.proveedorid) {  
            products = await ProvProductoModel.query()
                .where('proveedorid', args.proveedorid)
                .join('producto', 'prov_producto.productoid', '=', 'producto.id')  
                .select('producto.id', 'producto.nombre', 'producto.referencia', 'producto.url');
            //.where('proveedorid', args.proveedorid);
        } else {
            products = await ProductModel.query();
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