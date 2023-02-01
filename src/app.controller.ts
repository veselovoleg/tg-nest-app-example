import { Controller, Get } from '@nestjs/common';
import { Config } from 'prettier';
import { AppService } from './app.service';
import { BotService } from './services/bot.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly botService: BotService,
  ) {
    this.botService.init();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
