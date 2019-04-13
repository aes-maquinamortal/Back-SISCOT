const CotizacionModel = require('../models/cotizacion.model');
const CotizacionProductoModel = require('../models/coti_producto.model');

_registerCotiProducto = (cotizacionProductoInput) => {
    const cotizacionProductoModel = CotizacionProductoModel.query()
        .insert(cotizacionProductoInput);
    return cotizacionProductoModel
}

module.exports.Mutation = {
    registerCotizacion: async (_, args) => {
        const cotizacionModel = await CotizacionModel.query()
            .insert(args.cotizacionInput);
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