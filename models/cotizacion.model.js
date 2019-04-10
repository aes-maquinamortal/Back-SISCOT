const { Model } = require('objection');

class Cotizacion extends Model {
    static get tableName() {
        return 'cotizacion'
    }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = Cotizacion;