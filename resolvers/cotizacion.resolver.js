const CotizacionModel = require('../models/cotizacion.model');
const CotizacionProductoModel = require('../models/coti_producto.model');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');


module.exports = {
    registerCotizacion: async (args) => {
        const cotizacionModel = await CotizacionModel.query()
            .insert(args.cotizacionInput);
        return cotizacionModel
    },

    registerProducto: async (args) => {
        const cotizacionProductoModel = await CotizacionProductoModel.query()
            .insert(args.cotizacionProductoInput);
        return cotizacionProductoModel
    }
}