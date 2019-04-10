const { Model } = require('objection');

class CotiCotizacion extends Model {
    static get tableName() {
        return 'coti_producto'
    }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = CotiCotizacion;