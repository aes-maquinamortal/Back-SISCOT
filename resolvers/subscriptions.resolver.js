const TMP_TOPIC = 'somethinghere';
const pubSub = require('./pubsub');

module.exports = {
    dashboardsRealtime: {
        subscribe: () => pubSub.asyncIterator(TMP_TOPIC),
        resolve: (payload) => {
            return payload;
        }
    }
}