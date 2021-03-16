const { Kafka } = require('kafkajs');
const config = {
  topic: 'event-firehose',
  server: 'url',
  clientId: 'brendan-local-node'
};

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: [config.server]
})

const run = async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: config.topic, fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message)
    },
  })
};

run();
