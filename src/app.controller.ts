import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  sayHello(): string {
    return "Delivery API 2.0";
  }

  @Get('/healthcheck')
  health(): string {
    return this.appService.healthCheck();
  }
}
