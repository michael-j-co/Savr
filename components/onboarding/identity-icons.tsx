import type { IdentityIconSvg } from '@/constants/onboarding-flows';
import React from 'react';

import AspiringIcon from '@/assets/icons/aspiring.svg';
import BulkIcon from '@/assets/icons/bulk.svg';
import CerealIcon from '@/assets/icons/cereal.svg';
import MichelinIcon from '@/assets/icons/michelin.svg';
import RamenIcon from '@/assets/icons/ramen.svg';

const DEFAULT_SIZE = 32;

interface IdentityIconProps {
  size?: number;
  color?: string;
}

/** Wraps an SVG import so we can pass size consistently. */
function wrapSvg(
  SvgComponent: React.ComponentType<{ width?: number; height?: number }>
): React.FC<IdentityIconProps> {
  return ({ size = DEFAULT_SIZE }: IdentityIconProps) => (
    <SvgComponent width={size} height={size} />
  );
}

const MAP: Record<IdentityIconSvg, React.FC<IdentityIconProps>> = {
  bulk: wrapSvg(BulkIcon),
  cereal: wrapSvg(CerealIcon),
  michelin: wrapSvg(MichelinIcon),
  ramen: wrapSvg(RamenIcon),
  aspiring: wrapSvg(AspiringIcon),
};

export function getIdentityIconComponent(
  key: IdentityIconSvg
): React.FC<IdentityIconProps> {
  return MAP[key];
}
