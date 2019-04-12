module.exports = `
    type Proveedor {
        nit: ID!
        nombre: String!
        direccion: String!
    }

    input ProveedorInput {
        nit: ID!
        nombre: String!
        direccion: String!
    }
`