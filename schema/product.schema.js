module.exports = `
    type Product {
        id: ID!
        nombre: String!
        precio: Float!
        stock: Int!
        referencia: String!
    }

    input ProductInput {
        nombre: String!
        precio: Float!
        stock: Int!
        referencia: String!
    }
`