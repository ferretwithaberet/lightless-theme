import Color from 'color';

const hexaFromColor = (color: Color): string =>
  color.hex() + Math.round(color.alpha() * 255).toString(16);

export { hexaFromColor };
