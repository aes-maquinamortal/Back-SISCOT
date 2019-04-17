const PropuestaModel = require('../models/propuesta.model');
const PropProductoModel = require('../models/prop_producto.model');

module.exports.Mutation = {
    createPropuesta: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        const propuestaModel = await PropuestaModel.query().insert({
            ...args.propuestaInput,
            fecha: new Date().toJSON().split('T')[0],
            proveedorid: context.id
        });
        args.propProductoInput.forEach(async producto => {
            await PropProductoModel.query().insert({
                ...producto,
                propuestaid: propuestaModel.id
            });
        });
        // TODO: send email to client
        return propuestaModel;
    }
}

module.exports.Query = {
    propuesta: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        const propuestasModel = await PropuestaModel.query()
            .where('cotizacionid', args.cotizacionid)
            .andWhere('proveedorid', context.id)
            .eager('productos');
        if(propuestasModel.length === 0) return null;
        return propuestasModel[0];
    }
}