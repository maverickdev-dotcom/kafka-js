import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer/producer.service';
import { ConsumerService } from './kafka/consumer/consumer.service';
@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {}

  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [{ value: 'Hello World!' }],
    });
    return 'Hello World!';
  }
}
