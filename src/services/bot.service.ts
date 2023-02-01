import { Injectable } from '@nestjs/common';
import { Command } from 'src/commands/command.class';
import { StartCommand } from 'src/commands/start.command';
import { Context, Telegraf } from 'telegraf';
import LocalSession = require('telegraf-session-local');
import { ConfigService } from './config.service';

export interface SessionData {
  reaction: string;
}

export interface IBotContext extends Context {
  session: SessionData;
}

@Injectable()
export class BotService {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(private readonly configService: ConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
    this.bot.use(
      new LocalSession({ database: 'telegram_sessions_db.json' }).middleware(),
    );
  }

  public init() {
    this.commands = [new StartCommand(this.bot)];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }
}
