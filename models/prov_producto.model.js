const { Model } = require('objection');
const path = require('path')

class ProvProducto extends Model {
    static get tableName() {
        return 'prov_producto'
    }

    static get relationMappings() {
        return {
            producto: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, '/product.model'),
                from: 'prov_producto.productoid',
                join: {
                    from: 'prov_producto.productoid',
                    to: 'producto.id'
                },
                to: 'producto.id'
            }
        }
    }
}

module.exports = ProvProducto;