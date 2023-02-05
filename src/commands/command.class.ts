import * as fs from 'fs';
import { IBotContext } from 'src/services/bot.service';
import { ForeCastService } from 'src/services/forecast.service';
import { Telegraf, Context } from 'telegraf';

export abstract class Command {
  constructor(
    protected bot: Telegraf<IBotContext>,
    protected allowedUsersIds: string[],
    protected forecastService: ForeCastService,
  ) {}

  abstract handle(): void;

  protected checkIfUserIdAllowed(userId: string | number): boolean {
    return this.allowedUsersIds.includes(String(userId));
  }

  protected replyToUnknownUser(ctx: Context): void {
    ctx.replyWithVideo({
      source: fs.createReadStream('./src/assets/who_are_you.mp4'),
    });
  }
}
