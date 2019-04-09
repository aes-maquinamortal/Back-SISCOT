const productSchema = require('./product.schema');
const authSchema = require('./auth.schema');
const clienteSchema = require('./cliente.schema');
const proveedorSchema = require('./proveedor.schema');
const usuarioSchema = require('./usuario.schema');

module.exports = `
    ${productSchema}
    ${authSchema}
    ${clienteSchema}
    ${proveedorSchema}
    ${usuarioSchema}

    type RootQuery {
        products(proveedorid: String): [Product!]!
        login(usuario: String!, password: String!): AuthData
    }

    type RootMutation {
        createProduct(productInput: ProductInput): Product
        registerClient(clienteInput: ClienteInput, usuarioInput: UsuarioInput): Cliente
        registerSupplier(proveedorInput: ProveedorInput, usuarioInput: UsuarioInput): Proveedor
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`