module.exports = `
    type Proveedor {
        nit: Int!
        nombre: String!
        direccion: String!
    }

    input ProveedorInput {
        nit: Int!
        nombre: String!
        direccion: String!
    }
`