const CotizacionModel = require('../models/cotizacion.model');
const CotizacionProductoModel = require('../models/coti_producto.model');

_registerCotiProducto = (cotizacionProductoInput) => {
    const cotizacionProductoModel = CotizacionProductoModel.query()
        .insert(cotizacionProductoInput);
    return cotizacionProductoModel
}

module.exports.Query = {
    cotizaciones: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        let cotizacionModel = [];
        if(context.userType !== 'CLIENTE') {
            const availableCotizaciones = await CotizacionProductoModel.query()
                .select('cotizacionid')
                .whereIn('productoid', builder => {
                    builder.select('id').from('prov_producto').where('proveedorid', context.id)
                })
            let cotizacionesIds = [];
            availableCotizaciones.forEach((cotiId) => {
                cotizacionesIds.push(cotiId.cotizacionid);
            });
            cotizacionModel = await CotizacionModel.query().findByIds(cotizacionesIds)
                .eager('productos');
        } else {
            cotizacionModel = await CotizacionModel.query()
                .where('identificacion', context.id)
                .eager('productos');
        }

        return cotizacionModel;
    },

    cotizacion: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        return await CotizacionModel.query().findById(args.cotizacionid)
            .eager('productos');
    }
}

module.exports.Mutation = {
    registerCotizacion: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');
        
        const cotizacionModel = await CotizacionModel.query()
            .insert({
                identificacion: context.id,
                fecha: new Date().toJSON().split('T')[0]
            });
        args.cotizacionProductoInput.forEach(async element => {
            element.cotizacionid = cotizacionModel.id
            await _registerCotiProducto(element);
        });
        return cotizacionModel
    }
}