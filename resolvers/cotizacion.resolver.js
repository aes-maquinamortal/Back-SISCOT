const CotizacionModel = require('../models/cotizacion.model');
const CotizacionProductoModel = require('../models/coti_producto.model');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');

_registerCotiProducto = (cotizacionProductoInput) => {
    const cotizacionProductoModel = CotizacionProductoModel.query()
        .insert(cotizacionProductoInput);
    return cotizacionProductoModel
}

module.exports = {
    registerCotizacion: async (args) => {
        const cotizacionModel = await CotizacionModel.query()
            .insert(args.cotizacionInput);
        args.cotizacionProductoInput.forEach(async element => {
            element.cotizacionid = cotizacionModel.id
            await _registerCotiProducto(element);
        });
        return cotizacionModel
    },

    registerProducto: async (args) => {
        const cotizacionProductoModel = await CotizacionProductoModel.query()
            .insert(args.cotizacionProductoInput);
        return cotizacionProductoModel
    }
}