const { Model } = require('objection');
const Cliente = require('./cliente.model')
const Proveedor = require('./proveedor.model')

class Usuario extends Model {
    static get tableName() {
        return 'usuario'
    }

    static get relationMappings() {
        return {
            cliente: {
                relation: Model.BelongsToOneRelation,
                modelClass: Cliente,
                join: {
                    from: 'usuario.usuario',
                    to: 'cliente.usuario'
                }
            },
            proveedor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Proveedor,
                join: {
                    from: 'usuario.usuario',
                    to: 'proveedor.usuario'
                }
            }
        }
    }
}

module.exports = Usuario;