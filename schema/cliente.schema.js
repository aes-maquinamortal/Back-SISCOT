module.exports = `
    type Cliente {
        identificacion: ID!
        tipo_identificacion: String!
        nombre: String!
        usuario: String!
        direccion: String!
    }

    input ClienteInput {
        identificacion: ID!
        tipo_identificacion: String!
        nombre: String!
        usuario: String!
        direccion: String!
    }
`