const { Model } = require('objection');

class Proveedor extends Model {
    static get tableName() {
        return 'proveedor'
    }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = Proveedor;