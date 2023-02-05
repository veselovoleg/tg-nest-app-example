import { Injectable } from '@nestjs/common';
import { Command } from 'src/commands/command.class';
import { StartCommand } from 'src/commands/start.command';
import { IBotContext, IBotService } from 'src/misc/interfaces';
import { Telegraf } from 'telegraf';
import LocalSession = require('telegraf-session-local');
import { ConfigService } from './config.service';
import { ForeCastService } from './forecast.service';

@Injectable()
export class BotService implements IBotService {
  public bot: Telegraf<IBotContext>;
  private allowedUsersIds: string[];
  private commands: Command[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly forecastService: ForeCastService,
  ) {
    this.allowedUsersIds =
      this.configService.get('ALLOWED_USERS')?.split(',') || [];
    console.log({ allowedUserIds: this.allowedUsersIds });
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
    this.bot.use(
      new LocalSession({ database: 'telegram_sessions_db.json' }).middleware(),
    );
  }

  public init(): void {
    this.commands = [
      new StartCommand(this.bot, this.allowedUsersIds, this.forecastService),
    ];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}
export { IBotContext };
