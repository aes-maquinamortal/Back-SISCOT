module.exports = `
    type Cotizacion {
        id: Int!
        identificacion: Int!
        fecha: String!
        productos: [CotizacionProducto]
    }

    type CotizacionProducto {
        id: Int!
        referencia: String!
        nombre: String!
        cantidad: Int!
    }

    input CotizacionProductoInput {
        productoid: Int!
        cantidad: Int!
    }

`