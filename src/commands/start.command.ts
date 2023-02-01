import { IBotContext } from 'src/services/bot.service';
import { Markup, Telegraf } from 'telegraf';
import { Command } from './command.class';

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  public handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply(
        'Do you like it?',
        Markup.inlineKeyboard([
          Markup.button.callback('👍', 'like'),
          Markup.button.callback('👎', 'dislike'),
          Markup.button.callback('😑', 'neutral'),
        ]),
      );
    });

    this.bot.action('like', (ctx) => {
      ctx.session.reaction = 'like';
      ctx.editMessageText('😁 Cool!');
    });

    this.bot.action('dislike', (ctx) => {
      ctx.session.reaction = 'dislike';
      ctx.editMessageText('😥 Sad...');
    });

    this.bot.action('neutral', (ctx) => {
      ctx.session.reaction = 'neutral';
      ctx.editMessageText('😑 OK!');
    });
  }
}
