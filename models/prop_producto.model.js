const { Model } = require('objection');

class PropProducto extends Model {
    static get tableName() {
        return 'prop_producto'
    }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = PropProducto;