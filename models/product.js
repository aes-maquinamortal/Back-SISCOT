const { Model } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'producto'
    }

    static get relationMappings() {
        return {
        }
    }
}