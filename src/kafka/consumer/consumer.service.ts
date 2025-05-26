import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import {
  Kafka,
  Consumer,
  ConsumerSubscribeTopics,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: 'my-consumer-group',
    });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }
  async onModuleInit() {
    await this.consumers.forEach(async (consumer) => {
      await consumer.connect();
    });
  }
  async onApplicationShutdown() {
    await Promise.all(
      this.consumers.map(async (consumer) => {
        await consumer.disconnect();
      }),
    );
  }
}
