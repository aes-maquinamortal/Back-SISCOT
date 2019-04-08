module.exports = `
    type Product {
        id: ID!
        nombre: String!
        referencia: String!
    }

    input ProductInput {
        nombre: String!
        referencia: String!
    }
`