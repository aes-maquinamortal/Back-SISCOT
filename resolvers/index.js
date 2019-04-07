const productResolvers = require('./product.resolver');
const usuarioResolvers = require('./usuario.resolver');

module.exports = {
    ...productResolvers,
    ...usuarioResolvers
}