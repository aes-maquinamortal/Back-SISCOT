const ProductModel = require('../models/product.model');
const ProvProductoModel = require('../models/prov_producto.model');

module.exports.Query = {
    products: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        let products = [];
        if(args.proveedorid) {  
            products = await ProvProductoModel.query()
                .where('proveedorid', args.proveedorid)
                .join('producto', 'prov_producto.productoid', '=', 'producto.id')  
                .select('producto.id', 'producto.nombre', 'producto.referencia', 'producto.url');
        } else if(args.productIds) {
            products = await ProductModel.query().whereNotIn('id', args.productIds);
        } else {
            products = await ProductModel.query();
        }
        return products;
    },
}

module.exports.Mutation = {
    createProduct: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');
        
        let product = await ProductModel.query()
            .where('referencia', args.productInput.referencia);

        if (product.length === 0) {
            product = await ProductModel.query().insert(args.productInput);
        } else {
            product = product[0];
        }

        const provProducto = await ProvProductoModel.query()
            .where('proveedorid', context.id).andWhere('productoid', product.id);

        if(provProducto.length === 0){
            await ProvProductoModel.query().insert({
                proveedorid: context.id,
                productoid: product.id
            });
        }

        
        return product;
    }
}