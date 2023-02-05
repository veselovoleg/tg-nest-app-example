import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './services/bot.service';
import { ConfigService } from './services/config.service';
import { ForeCastService } from './services/forecast.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ForeCastService,
    ConfigService,
    {
      provide: BotService,
      useFactory: (
        configService: ConfigService,
        forecastService: ForeCastService,
      ) => {
        return new BotService(configService, forecastService);
      },
      inject: [ConfigService, ForeCastService],
    },
  ],
})
export class AppModule {}
