const { Model } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'producto'
    }

    static get relationMappings() {
        return {
            /*producto: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, '/product.model'),
                from: 'prov_producto.productoid',
                join: {
                    from: 'prov_producto.productoid',
                    to: 'producto.id'
                },
                to: 'producto.id'
            }*/
        }
    }
}

module.exports = Product;