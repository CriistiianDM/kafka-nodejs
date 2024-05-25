const { Kafka } = require('kafkajs');
const { config } = require('dotenv');
config();

setTimeout(() => {

console.log(process.env.KAFKA_BROKER)

const kafka = new Kafka({
clientId: 'my-consumer',
brokers: [`${process.env.KAFKA_BROKER}`]
});

const consumer = kafka.consumer({ groupId: 'test-group' });
const run = async () => {

await consumer.connect();

await consumer.subscribe({ topic: 'univalle-ideas', fromBeginning: true });

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: message.value.toString(),
        topic,
        partition,
        });
        },
        });
        };
        run().catch(console.error);
        
        process.on('SIGINT', async () => {
        console.log('Cerrando el consumidor...');
        await consumer.disconnect();
        process.exit(0);
        });
        process.on('SIGTERM', async () => {
        console.log('Cerrando el consumidor...');
        await consumer.disconnect();
        process.exit(0);
})},10000)