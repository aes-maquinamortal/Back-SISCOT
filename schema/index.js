const productSchema = require('./product.schema');
const authSchema = require('./auth.schema');

module.exports = `
    ${productSchema}
    ${authSchema}

    type RootQuery {
        products: [Product!]!
        login(usuario: String!, password: String!): AuthData
    }

    type RootMutation {
        createProduct(productInput: ProductInput): Product
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`