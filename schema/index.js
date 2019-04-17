const productSchema = require('./product.schema');
const authSchema = require('./auth.schema');
const clienteSchema = require('./cliente.schema');
const proveedorSchema = require('./proveedor.schema');
const usuarioSchema = require('./usuario.schema');
const cotizacionSchema = require('./cotizacion.schema');
const propuestaSchema = require('./propuesta.schema');

module.exports = `
    ${productSchema}
    ${authSchema}
    ${clienteSchema}
    ${proveedorSchema}
    ${usuarioSchema}
    ${cotizacionSchema}
    ${propuestaSchema}

    type Query {
        products(proveedorid: String, productIds: [Int]): [Product!]!
        login(usuario: String!, password: String!): AuthData
        cotizaciones: [Cotizacion]
        cotizacion(cotizacionid: Int!): Cotizacion!
        propuesta(cotizacionid: Int!): Propuesta
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product
        registerClient(clienteInput: ClienteInput, usuarioInput: UsuarioInput): Cliente
        registerSupplier(proveedorInput: ProveedorInput, usuarioInput: UsuarioInput): Proveedor
        registerCotizacion(cotizacionProductoInput: [CotizacionProductoInput]): Cotizacion
        createPropuesta(propuestaInput: PropuestaInput!, propProductoInput: [PropProductoInput!]!): Propuesta
    }

    type Subscription {
        dashboardsRealtime: String
    }
`