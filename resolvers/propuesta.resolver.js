const PropuestaModel = require('../models/propuesta.model');
const PropProductoModel = require('../models/prop_producto.model');
const pubSub = require('./pubsub');
const ConfigMensaje = require('../middleware/configMensaje');

const TMP_TOPIC = 'proposalsBySupplierAccepted';

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
        ConfigMensaje('nodejs2019@gmail.com', 'Proveedor Creado', 
        `
        <strong>Propuesta:</strong> ${propuestaModel.id} <br/>
        <strong>Respondieron a tu cotización </strong> 
        `);
        return propuestaModel;
    },

    acceptPropuesta: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        await PropuestaModel.query()
            .patch({ estado: 'RECHAZADA' })
            .where('cotizacionid', args.cotizacionid);

        const propuestaModel = await PropuestaModel.query().eager('proveedor')
            .patchAndFetchById(args.propuestaid, { estado: 'ACEPTADA' });

        pubSub.publish(TMP_TOPIC, propuestaModel.proveedor.nombre);
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
    },

    propuestas: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        const propuestasModel = await PropuestaModel.query()
            .where('cotizacionid', args.cotizacionid)
            .eager('[productos, proveedor]')
            
        return propuestasModel;
    },

    getProposalsDashboard: async (_, args, context) => {
        if (!context.isAuthenticated) throw new Error('Unauthorized');

        const knex = PropuestaModel.knex();
        const result = await knex.raw(`
            SELECT prove.nombre, IFNULL(prov.acceptedTotal, 0) AS acceptedTotal
            FROM propuesta prop LEFT OUTER JOIN (
                SELECT proveedorid, COUNT(estado) AS acceptedTotal 
                FROM propuesta 
                WHERE estado = 'ACEPTADA' 
                GROUP BY proveedorid
            ) prov ON prop.proveedorid = prov.proveedorid, proveedor prove
            WHERE prop.cotizacionid = ? AND prove.nit = prop.proveedorid
        `, [args.cotizacionid]);
        const resultDashboards = {
            proveedores: [],
            propuestasAceptadas: []
        }
        for(let i = 0; i < result[0].length; i++) {
            resultDashboards.proveedores.push(result[0][i].nombre);
            resultDashboards.propuestasAceptadas.push(result[0][i].acceptedTotal);
        }

        return resultDashboards;
    }
}