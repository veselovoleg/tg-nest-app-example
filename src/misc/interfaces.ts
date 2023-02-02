import { Context } from 'telegraf';

/**
 * Services
 */
export interface IConfigService {
  get(key: string): string;
}

export interface IBotService {
  init(): void;
}

export type THoroskcopeSignNames =
  | 'oven'
  | 'telec'
  | 'bliznetcy'
  | 'rak'
  | 'lev'
  | 'deva'
  | 'vesy'
  | 'scorpion'
  | 'vesy'
  | 'scorpion'
  | 'strelec'
  | 'kozerog'
  | 'vodoley'
  | 'ryby';

/**
 * Telegraf sessions
 */
export interface ISessionData {
  reaction: THoroskcopeSignNames;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
