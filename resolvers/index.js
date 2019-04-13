const { Query: productQuery, Mutation: productMutation } = require('./product.resolver');
const { Query: usuarioQuery, Mutation: usuarioMutation } = require('./usuario.resolver');
const { Mutation: cotizacionMutation } = require('./cotizacion.resolver');
const subscriptionResolvers = require('./subscriptions.resolver');

module.exports = {
    Query: {
        ...productQuery,
        ...usuarioQuery
    },
    Mutation: {
        ...productMutation,
        ...usuarioMutation,
        ...cotizacionMutation
    },
    Subscription: subscriptionResolvers
}