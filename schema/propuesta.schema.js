module.exports = `
    type Propuesta {
        id: Int!
        fecha: String!
        total: Float!
        descuento: Float!
        estado: String!
        productos: [PropuestaProducto]
        proveedor: Proveedor
    }

    type PropuestaProducto {
        id: Int!
        nombre: String!
        referencia: String!
        cantidad: Int!
        valor_unitario: Float!
    }

    input PropuestaInput {
        cotizacionid: Int!
        total: Float!
        descuento: Float!
    }

    input PropProductoInput {
        productoid: Int!
        cantidad: Int!
        valor_unitario: Float!
    }
`