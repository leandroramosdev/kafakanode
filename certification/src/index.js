import { Kafka } from 'kafkajs'
const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'certficate'
})

const topic = 'issue-certificate'
const consumer = kafka.consumer({ groupId: 'certificate-group' })

const producer = kafka.producer();

async function run() {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({ value: message.value.toString() })

            const payload = JSON.parse(message.value)

            setTimeout(() => {
                producer.send({
                    topic: 'certification-response',
                    messages: [
                        {value: `Cerfificado do usuário ${payload.name} gerado!`}
                    ]
                })
            }, 3000)
        },
    })
}

run().catch(console.error)