const productResolvers = require('./product.resolver');
const usuarioResolvers = require('./usuario.resolver');
const cotizacionResolvers = require('./cotizacion.resolver');

module.exports = {
    ...productResolvers,
    ...usuarioResolvers,
    ...cotizacionResolvers
}