import React from 'react';
import Svg, { Path } from 'react-native-svg';

const VIEW_BOX = '0 0 640 640';
const ICON_COLOR = '#789F80';

interface IdentityIconProps {
  size?: number;
  color?: string;
}

/**
 * Lightbulb icon for "Aspiring Chef" (assets/icons/lightbulb-regular-full.svg)
 */
export function IdentityIconLightbulb({ size = 32, color = ICON_COLOR }: IdentityIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEW_BOX} fill="none">
      <Path
        fill={color}
        d="M424.5 355.1C449 329.2 464 294.4 464 256C464 176.5 399.5 112 320 112C240.5 112 176 176.5 176 256C176 294.4 191 329.2 215.5 355.1C236.8 377.5 260.4 409.1 268.8 448L371.2 448C379.6 409 403.2 377.5 424.5 355.1zM459.3 388.1C435.7 413 416 443.4 416 477.7L416 496C416 540.2 380.2 576 336 576L304 576C259.8 576 224 540.2 224 496L224 477.7C224 443.4 204.3 413 180.7 388.1C148 353.7 128 307.2 128 256C128 150 214 64 320 64C426 64 512 150 512 256C512 307.2 492 353.7 459.3 388.1zM272 248C272 261.3 261.3 272 248 272C234.7 272 224 261.3 224 248C224 199.4 263.4 160 312 160C325.3 160 336 170.7 336 184C336 197.3 325.3 208 312 208C289.9 208 272 225.9 272 248z"
      />
    </Svg>
  );
}

/**
 * Bowl/food icon for "Instant Ramen Maker" (assets/icons/bowl-food-solid-full.svg)
 */
export function IdentityIconBowlFood({ size = 32, color = ICON_COLOR }: IdentityIconProps) {
  return (
    <Svg width={size} height={size} viewBox={VIEW_BOX} fill="none">
      <Path
        fill={color}
        d="M64 240C64 204.7 92.7 176 128 176C128.5 176 129.1 176 129.6 176C137 139.5 169.3 112 208 112C223 112 237 116.1 248.9 123.2C262.2 97.5 289 80 320 80C351 80 377.8 97.6 391.1 123.2C403.1 116.1 417.1 112 432 112C470.7 112 503 139.5 510.4 176C510.9 176 511.5 176 512 176C547.3 176 576 204.7 576 240C576 251.7 572.9 262.6 567.4 272L72.6 272C67.1 262.6 64 251.7 64 240zM64 347.4C64 332.3 76.3 320 91.4 320L548.5 320C563.6 320 575.9 332.3 575.9 347.4C575.9 417.9 531.5 478.1 469.2 501.5L467.5 516C465.5 532 451.9 544 435.7 544L204.2 544C188.1 544 174.4 532 172.4 516L170.6 501.6C108.4 478.1 64 417.9 64 347.4z"
      />
    </Svg>
  );
}

const MAP: Record<'lightbulb' | 'bowl-food', React.ComponentType<IdentityIconProps>> = {
  lightbulb: IdentityIconLightbulb,
  'bowl-food': IdentityIconBowlFood,
};

export function getIdentityIconComponent(
  key: 'lightbulb' | 'bowl-food'
): React.ComponentType<IdentityIconProps> {
  return MAP[key];
}
