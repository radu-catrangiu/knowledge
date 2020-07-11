const { KafkaClient, Producer } = require("kafka-node");

const kafkaClientConfig = {
    kafkaHost: "localhost:9092",
};
const client = new KafkaClient(kafkaClientConfig);
const producer = new Producer(client);

function runProducer() {
    const message = {
        text: "hello world",
        date: new Date()
    };
    const payload = {
        topic: "test-topic1",
        messages: JSON.stringify(message),
    };
    producer.send([payload], (err, data) => {
        console.log(err, data)
    });
}

producer.on("ready", () => {
    const PRODUCE_INTERVAL = 1000;
    setInterval(runProducer, PRODUCE_INTERVAL);
    console.log("Producer ready!");
});

producer.on("error", (err) => {
    console.error(err);
    process.exit(1);
});
