import { IBotContext } from 'src/services/bot.service';
import { HOROSKOP_SIGNS_NAMES as signs } from '../misc/constants';
import { Markup, Telegraf } from 'telegraf';
import { Command } from './command.class';
import { ForeCastService } from 'src/services/forecast.service';

export class StartCommand extends Command {
  constructor(
    public bot: Telegraf<IBotContext>,
    protected allowedUsersIds: string[],
    protected forecastService: ForeCastService,
  ) {
    super(bot, allowedUsersIds, forecastService);
  }

  public handle(): void {
    const signsList = Object.values(signs);

    this.bot.start((ctx) => {
      if (!this.checkIfUserIdAllowed(ctx.from.id)) {
        this.replyToUnknownUser(ctx);
        return;
      }

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

      console.log(ctx.from.id);
    });

    // write is somewhere
    let sign;

    signsList.forEach((item) =>
      this.bot.action(item.id, (ctx) => {
        if (!this.checkIfUserIdAllowed(ctx.from.id)) {
          this.replyToUnknownUser(ctx);
          return;
        }

        sign = item.id;
        ctx.session.reaction = item.id;
        ctx.editMessageText(
          `${ctx.from.first_name}, ваш знак зодиака: ${
            item.sign
          } ${item.name.toUpperCase()} ${item.sign}.`,
        );
        ctx.reply(
          `Хотите получить предсказание на сегодня?🔮`,
          Markup.inlineKeyboard([
            Markup.button.callback(`Получить предсказание!`, 'daily_forecast'),
          ]),
        );
      }),
    );

    // TODO: move to new command type
    this.bot.action('daily_forecast', (ctx) => {
      const forecast = this.forecastService.signsForecast[sign];
      ctx.reply(forecast);
    });
  }
}
