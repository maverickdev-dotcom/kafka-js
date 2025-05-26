import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topic: 'test',
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value,
          });
        },
      },
    );
  }
}
