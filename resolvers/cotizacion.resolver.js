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
            const knex = CotizacionModel.knex();
            const availableCotizaciones = await knex.raw(`
                SELECT coti.cotizacionid 
                FROM (SELECT cotizacionid, COUNT(productoid) AS c_products FROM coti_producto GROUP BY cotizacionid) coti,
                     (
                        SELECT cotizacionid, COUNT(productoid) AS c_products 
                        FROM (SELECT coti.* FROM prov_producto prov JOIN coti_producto coti ON coti.productoid = prov.productoid WHERE proveedorid = ?) coti_prov 
                        GROUP BY (cotizacionid)
                     ) prov
                WHERE coti.cotizacionid = prov.cotizacionid AND coti.c_products = prov.c_products
            `, [context.id]);
            let cotizacionesIds = [];
            for(let i = 0; i < availableCotizaciones[0].length; i++) {
                cotizacionesIds.push(availableCotizaciones[0][i].cotizacionid);
            }
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