import { IBotContext } from 'src/services/bot.service';
import { HOROSKOP_SIGNS_NAMES as signs } from '../misc/constants';
import { Markup, Telegraf } from 'telegraf';
import { Command } from './command.class';

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  public handle(): void {
    const signsList = Object.values(signs);
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply(
        `${ctx.from.first_name}, выберите свой знак зодиака, чтобы получить предсказание 🔮`,
        Markup.inlineKeyboard(
          signsList.map((item) => [
            Markup.button.callback(
              `${item.sign} ${item.name.toUpperCase()} ${item.sign}`,
              item.id,
            ),
          ]),
        ),
      );
    });

    signsList.forEach((item) =>
      this.bot.action(item.id, (ctx) => {
        ctx.session.reaction = item.id;
        ctx.editMessageText(
          `${ctx.from.first_name}, ваш знак зодиака: ${
            item.sign
          } ${item.name.toUpperCase()} ${item.sign}.`,
        );
      }),
    );
  }
}
