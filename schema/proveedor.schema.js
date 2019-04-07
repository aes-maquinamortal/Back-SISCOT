module.exports = `
    type Proveedor {
        nit: ID!
        nombre: String!
        usuario: String!
        direccion: String!
    }

    input ProveedorInput {
        nit: ID!
        nombre: String!
        usuario: String!
        direccion: String!
    }
`