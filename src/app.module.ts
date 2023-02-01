import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './services/bot.service';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: BotService,
      useFactory: (configService: ConfigService) => {
        return new BotService(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
