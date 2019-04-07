const { Model } = require('objection');

class Usuario extends Model {
    static get tableName() {
        return 'usuario'
    }

    static get relationMappings() {
        return {
        }
    }
}

module.exports = Usuario;