import type { ComponentType } from 'react';
import ErewhonLogo from '@/assets/icons/erewhon.svg';
import PublixLogo from '@/assets/icons/publix.svg';
import RaleysLogo from '@/assets/icons/raleys.svg';
import RalphsLogo from '@/assets/icons/ralphs.svg';
import SproutsLogo from '@/assets/icons/sprouts.svg';
import TraderJoesLogo from '@/assets/icons/traderjoes.svg';
import VonsLogo from '@/assets/icons/vons.svg';
import WholeFoodsLogo from '@/assets/icons/wholefoods.svg';

export type PantryStoreKey =
  | 'wholefoods'
  | 'sprouts'
  | 'traderjoes'
  | 'ralphs'
  | 'erewhon'
  | 'vons'
  | 'raleys'
  | 'publix';

type LogoProps = { width: number; height: number };

/** Store logos in grid order: row 1 Whole Foods, Sprouts; row 2 Trader Joe's, Ralphs; etc. */
export const STORE_LOGOS: { key: PantryStoreKey; Logo: ComponentType<LogoProps> }[] = [
  { key: 'wholefoods', Logo: WholeFoodsLogo },
  { key: 'sprouts', Logo: SproutsLogo },
  { key: 'traderjoes', Logo: TraderJoesLogo },
  { key: 'ralphs', Logo: RalphsLogo },
  { key: 'erewhon', Logo: ErewhonLogo },
  { key: 'vons', Logo: VonsLogo },
  { key: 'raleys', Logo: RaleysLogo },
  { key: 'publix', Logo: PublixLogo },
];

const LOGO_MAP = Object.fromEntries(STORE_LOGOS.map((s) => [s.key, s.Logo]));

export function getStoreLogo(key: string): ComponentType<LogoProps> | undefined {
  return LOGO_MAP[key as PantryStoreKey];
}
