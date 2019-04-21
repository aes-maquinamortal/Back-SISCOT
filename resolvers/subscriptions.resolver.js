const TMP_TOPIC = 'proposalsBySupplierAccepted';
const pubSub = require('./pubsub');

module.exports = {
    dashboardsRealtime: {
        subscribe: () => pubSub.asyncIterator(TMP_TOPIC),
        resolve: (payload) => {
            return payload;
        }
    }
}