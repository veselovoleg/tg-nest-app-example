import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { HOROSKOP_SIGNS_NAMES } from 'src/misc/constants';
import { THoroskcopeSignNames } from 'src/misc/interfaces';
import { getRandomInt } from 'src/misc/utils';

@Injectable()
export class ForeCastService {
  private _signsForecast: Record<THoroskcopeSignNames, string>;

  constructor() {
    this.initForecasts();
  }

  get signsForecast(): Record<THoroskcopeSignNames, string> {
    return this._signsForecast;
  }

  private async initForecasts(): Promise<void> {
    const forecastsObject = {};
    const forecastData = await this.getForecatsData();

    Object.keys(HOROSKOP_SIGNS_NAMES).forEach((key: THoroskcopeSignNames) => {
      const text: string[] = [];

      Object.values(forecastData).forEach((part: string[]) => {
        const index = getRandomInt(0, part.length);
        text.push(part[index]);
      });

      forecastsObject[key] = text.join(' ');
    });

    this._signsForecast = forecastsObject as Record<
      THoroskcopeSignNames,
      string
    >;
  }

  private async getForecatsData(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/assets/data.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }

        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}
