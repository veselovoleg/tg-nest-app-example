import { config, DotenvParseOutput } from 'dotenv';
import { Injectable } from '@nestjs/common';

export interface IConfigService {
  get(key: string): string;
}

@Injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    this.config = this.parseConfigFile();
  }

  public get(key: string): string {
    const result = this.config[key];

    if (!result) {
      throw new Error(`The property ${key} doesn't exist in config`);
    }

    return result;
  }

  private parseConfigFile(): DotenvParseOutput {
    const { error, parsed } = config();

    if (error) {
      throw new Error('.env file not found');
    }

    if (!parsed) {
      throw new Error('.env is empty');
    }

    return parsed;
  }
}
