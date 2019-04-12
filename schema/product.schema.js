module.exports = `
    type Product {
        id: ID!
        nombre: String!
        referencia: String!
        url: String!
    }

    input ProductInput {
        nombre: String!
        referencia: String!
        url: String!
    }
`