const redis = require('redis');

const REDIS_HOST = 'redis-18233.c289.us-west-1-2.ec2.redns.redis-cloud.com';
const REDIS_PORT = 18233;
const REDIS_PASSWORD = '97ILrM6kGFoDzR5aoRRZUIRp73VsYnsu';


const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  password: REDIS_PASSWORD,
});


(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

module.exports = client;