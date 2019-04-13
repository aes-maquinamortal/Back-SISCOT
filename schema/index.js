const productSchema = require('./product.schema');
const authSchema = require('./auth.schema');
const clienteSchema = require('./cliente.schema');
const proveedorSchema = require('./proveedor.schema');
const usuarioSchema = require('./usuario.schema');
const cotizacionSchema = require('./cotizacion.schema');

module.exports = `
    ${productSchema}
    ${authSchema}
    ${clienteSchema}
    ${proveedorSchema}
    ${usuarioSchema}
    ${cotizacionSchema}

    type Query {
        products(proveedorid: String): [Product!]!
        login(usuario: String!, password: String!): AuthData
        sendDate(date: String): String
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product
        registerClient(clienteInput: ClienteInput, usuarioInput: UsuarioInput): Cliente
        registerSupplier(proveedorInput: ProveedorInput, usuarioInput: UsuarioInput): Proveedor
        registerCotizacion(cotizacionInput: CotizacionInput, cotizacionProductoInput: [CotizacionProductoInput]): Cotizacion
        registerProducto(cotizacionProductoInput: CotizacionProductoInput): CotizacionProducto
    }

    type Subscription {
        dashboardsRealtime: String
    }
`