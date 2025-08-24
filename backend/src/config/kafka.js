import {Kafka} from 'kafkajs';
export const kafka = new Kafka({
clientId: 'airport-tracker',
brokers: ['localhost:9092'],
});
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'airport-tracker-group' });

export async function connectKafka() {
try {
await producer.connect();
console. log(' Kafka producer connected');
await consumer.connect();
console.log(' Kafka consumer connected');
} catch (err) {
console.error(' Kafka connection failed:', err);
}
}