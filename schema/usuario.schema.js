module.exports = `
    type Usuario {
        usuario: String!
        password: String!
        correo: String!
        tipo: String!
    }

    input UsuarioInput {
        usuario: String!
        password: String!
        correo: String!
        tipo: String!
    }
`