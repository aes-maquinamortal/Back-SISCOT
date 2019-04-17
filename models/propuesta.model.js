const { Model } = require('objection');
const Producto = require('./product.model');

class Propuesta extends Model {
    static get tableName() {
        return 'propuesta'
    }

    static get relationMappings() {
        return {
            productos: {
                relation: Model.ManyToManyRelation,
                modelClass: Producto,
                join: {
                    from: 'propuesta.id',
                    through: {
                        from: 'prop_producto.propuestaid',
                        to: 'prop_producto.productoid',
                        extra: ['cantidad', 'valor_unitario']
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

module.exports = Propuesta;