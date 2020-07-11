const { KafkaClient, Consumer, Offset } = require('kafka-node');

const kafkaClientConfig = {
    kafkaHost: 'localhost:9092',
};
const client = new KafkaClient(kafkaClientConfig);
const consumer = new Consumer(client, [{ topic: 'test-topic1' }]);

function messageHandler(message) {
    let content;

    try {
        content = JSON.parse(message.value);
    } catch (error) {
        console.error(error);
        content = message.value;
    }

    console.log(message.topic, content);
}

client.on('ready', () => {
    console.log('Consumer ready!');
    consumer.on('message', messageHandler);
});

consumer.on("offsetOutOfRange", (err) => {
    const { topic, partition } = err;
    const kafkaOffset = new Offset(client);
    
    console.error(err);

    consumer.pause();
    kafkaOffset.fetchEarliestOffsets([topic], (err, data) => {
        const offset = data[topic][partition];
        consumer.setOffset(topic, partition, offset);
        consumer.resume();
    });
});

consumer.on("error", (err) => {
    console.error(err);
    process.exit(1);
});
