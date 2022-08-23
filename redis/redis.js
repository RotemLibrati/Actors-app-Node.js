const redis = require('redis');

const client = redis.createClient({ socket: { port: 6379 } });
client.connect();

client.on('connect', () => {
    console.log('Connected Redis');
});
client.on('ready', () => {
    console.log('Ready');
});
client.on('error', (err) => {
    console.log('Error', err);
});

module.exports = client;