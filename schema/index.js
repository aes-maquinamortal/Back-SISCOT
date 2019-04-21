const productSchema = require('./product.schema');
const authSchema = require('./auth.schema');
const clienteSchema = require('./cliente.schema');
const proveedorSchema = require('./proveedor.schema');
const usuarioSchema = require('./usuario.schema');
const cotizacionSchema = require('./cotizacion.schema');
const propuestaSchema = require('./propuesta.schema');
const subscriptionsSchema = require('./subscriptions.schema');

module.exports = `
    ${productSchema}
    ${authSchema}
    ${clienteSchema}
    ${proveedorSchema}
    ${usuarioSchema}
    ${cotizacionSchema}
    ${propuestaSchema}
    ${subscriptionsSchema}

    type Query {
        products(proveedorid: String, productIds: [Int]): [Product!]!
        login(usuario: String!, password: String!): AuthData
        cotizaciones: [Cotizacion]
        cotizacion(cotizacionid: Int!): Cotizacion!
        propuesta(cotizacionid: Int!): Propuesta
        propuestas(cotizacionid: Int!): [Propuesta]
        getProposalsDashboard(cotizacionid: Int!): ProposalsBySupplier
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product
        registerClient(clienteInput: ClienteInput, usuarioInput: UsuarioInput): Cliente
        registerSupplier(proveedorInput: ProveedorInput, usuarioInput: UsuarioInput): Proveedor
        registerCotizacion(cotizacionProductoInput: [CotizacionProductoInput]): Cotizacion
        createPropuesta(propuestaInput: PropuestaInput!, propProductoInput: [PropProductoInput!]!): Propuesta
        acceptPropuesta(cotizacionid: Int!, propuestaid: Int!): Propuesta
    }

    type Subscription {
        dashboardsRealtime: String
    }
`