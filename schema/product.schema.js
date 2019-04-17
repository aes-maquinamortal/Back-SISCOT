module.exports = `
    type Product {
        id: Int!
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