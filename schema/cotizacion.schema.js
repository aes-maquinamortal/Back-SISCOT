module.exports = `
    type Cotizacion {
        id: ID!
        identificacion: Int!
    }

    type CotizacionProducto {
        id: ID!
        cotizacionid: Int!
        productoid: Int!
        cantidad: Int!
    }

    input CotizacionInput {
        identificacion: Int!
    }

    input CotizacionProductoInput {
        cotizacionid: Int!
        productoid: Int!
        cantidad: Int!
    }

`