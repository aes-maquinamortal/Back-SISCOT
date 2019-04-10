module.exports = `
    type Cotizacion {
        id: ID!
        identificacion: Int!
        fecha: Date!
        fecha_fin: Date!
    }

    type CotizacionProducto {
        id: ID!
        identificacion: Int!
        fecha: Date!
        fecha_fin: Date!
    }

    input CotizacionInput {
        identificacion: Int!
        fecha: Date!
        fecha_fin: Date!
    }
`