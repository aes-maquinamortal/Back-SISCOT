const { Query: productQuery, Mutation: productMutation } = require('./product.resolver');
const { Query: usuarioQuery, Mutation: usuarioMutation } = require('./usuario.resolver');
const { Query: cotizacionQuery, Mutation: cotizacionMutation } = require('./cotizacion.resolver');
const { Query: propuestaQuery, Mutation: propuestaMutation } = require('./propuesta.resolver');
const subscriptionResolvers = require('./subscriptions.resolver');

module.exports = {
    Query: {
        ...productQuery,
        ...usuarioQuery,
        ...cotizacionQuery,
        ...propuestaQuery
    },
    Mutation: {
        ...productMutation,
        ...usuarioMutation,
        ...cotizacionMutation,
        ...propuestaMutation
    },
    Subscription: subscriptionResolvers
}