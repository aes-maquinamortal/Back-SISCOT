const productSchema = require('./product.schema');
const authSchema = require('./auth.schema');
const clienteSchema = require('./cliente.schema');
const proveedorSchema = require('./proveedor.schema');

module.exports = `
    ${productSchema}
    ${authSchema}
    ${clienteSchema}
    ${proveedorSchema}

    type RootQuery {
        products: [Product!]!
        login(usuario: String!, password: String!): AuthData
    }

    type RootMutation {
        createProduct(productInput: ProductInput): Product
        registerClient(clienteInput: ClienteInput): Cliente
        registerSupplier(proveedorInput: ProveedorInput): Proveedor
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`