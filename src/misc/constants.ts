import { THoroskcopeSignNames } from './interfaces';

export const HOROSKOP_SIGNS_NAMES: Record<
  THoroskcopeSignNames,
  { id: THoroskcopeSignNames; name: string; sign: string }
> = {
  oven: { id: 'oven', name: 'овен ', sign: '♈️' },
  telec: { id: 'telec', name: 'телец', sign: '♉️' },
  bliznetcy: { id: 'bliznetcy', name: 'близнецы', sign: '♊️' },
  rak: { id: 'rak', name: 'рак', sign: '♋️' },
  lev: { id: 'lev', name: 'лев', sign: '♌️' },
  deva: { id: 'deva', name: 'дева', sign: '♍️' },
  vesy: { id: 'vesy', name: 'весы', sign: '♎️' },
  scorpion: { id: 'scorpion', name: 'скорпион', sign: '♏️' },
  strelec: { id: 'strelec', name: 'стрелец', sign: '♐️' },
  kozerog: { id: 'kozerog', name: 'козерог', sign: '♑️' },
  vodoley: { id: 'vodoley', name: 'водолей', sign: '♒️' },
  ryby: { id: 'ryby', name: 'рыбы', sign: '♓️' },
};
