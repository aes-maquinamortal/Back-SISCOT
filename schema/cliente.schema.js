module.exports = `
    type Cliente {
        identificacion: Int!
        tipo_identificacion: String!
        nombre: String!
        direccion: String!
    }

    input ClienteInput {
        identificacion: Int!
        tipo_identificacion: String!
        nombre: String!
        direccion: String!
    }
`