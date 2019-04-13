const CotizacionModel = require('../models/cotizacion.model');
const CotizacionProductoModel = require('../models/coti_producto.model');

_registerCotiProducto = (cotizacionProductoInput) => {
    const cotizacionProductoModel = CotizacionProductoModel.query()
        .insert(cotizacionProductoInput);
    return cotizacionProductoModel
}

module.exports.Mutation = {
    registerCotizacion: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');
        
        const cotizacionModel = await CotizacionModel.query()
            .insert({
                identificacion: context.id
            });
        args.cotizacionProductoInput.forEach(async element => {
            element.cotizacionid = cotizacionModel.id
            await _registerCotiProducto(element);
        });
        return cotizacionModel
    },

    registerProducto: async (_, args) => {
        const cotizacionProductoModel = await CotizacionProductoModel.query()
            .insert(args.cotizacionProductoInput);
        return cotizacionProductoModel
    }
}