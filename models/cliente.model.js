const { Model } = require('objection');

class Cliente extends Model {
    static get tableName() {
        return 'cliente'
    }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = Cliente;