import { IBotContext } from 'src/services/bot.service';
import { Telegraf } from 'telegraf';

export abstract class Command {
  constructor(protected bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
