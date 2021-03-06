const { Model } = require('objection');
const Producto = require('./product.model');

class Cotizacion extends Model {
    static get tableName() {
        return 'cotizacion'
    }

    static get relationMappings() {
        return {
            productos: {
                relation: Model.ManyToManyRelation,
                modelClass: Producto,
                join: {
                    from: 'cotizacion.id',
                    through: {
                        from: 'coti_producto.cotizacionid',
                        to: 'coti_producto.productoid',
                        extra: ['cantidad']
                    },
                    to: 'producto.id'
                },
            }
        }
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);

        Object.keys(json).forEach(prop => {
            const value = json[prop];

            if (value instanceof Date) {
                json[prop] = value.toJSON().split('T')[0];
            }
        });

        return json;
    }
}

module.exports = Cotizacion;