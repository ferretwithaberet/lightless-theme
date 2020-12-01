import * as fs from 'fs';
import Color from 'color';
import { parse, stringify } from 'comment-json';

import { hexaFromColor } from './utils';

// Colors
const primary = Color('#8055FA');
const black = Color('#000000');
const white = Color('#ffffff');

const theme: { [key: string]: string } = {
  // Basic colors
  primary: primary.hex(),
  error: '#C43235',
  warning: '#F3C900',
  black: black.hex(),
  white: white.hex(),
  grey: white.darken(0.47).hex(),
  transparent: '#00000000',
  // Base backgrounds
  primaryBackground: white.darken(0.98).hex(),
  secondaryBackground: white.darken(0.93).hex(),
  // Shades of primary
  primaryLighter: primary.lighten(0.25).hex(),
  primaryHover: primary.darken(0.15).saturate(-0.2).hex(),
  primaryDarker: primary.darken(0.25).hex(),
  'primary-1': hexaFromColor(primary.alpha(0.25)),
  'primary-2': hexaFromColor(primary.alpha(0.5)),
  'primary-3': hexaFromColor(primary.alpha(0.75)),
  // Shades of transparent
  'darken-1': hexaFromColor(black.alpha(0.25)),
  'darken-2': hexaFromColor(black.alpha(0.5)),
  'darken-3': hexaFromColor(black.alpha(0.75)),
  'lighten-1': hexaFromColor(white.alpha(0.25)),
  'lighten-2': hexaFromColor(white.alpha(0.5)),
  'lighten-3': hexaFromColor(white.alpha(0.75))
};

// Create theme file
fs.readFile('./src/template-color-theme.json', 'utf8', (err, data) => {
  if (err) throw err;

  // For each key in theme, replace it in the theme data
  for (const key in theme) {
    data = data.split(`\${${key}}`).join(theme[key]);
  }

  // Make sure dist/themes/ exists
  fs.mkdir('./dist/themes/', { recursive: true }, (err) => {
    if (err) throw err;

    // Write new data to dist theme
    data = stringify(parse(data, undefined, true));
    fs.writeFile('./dist/themes/lightless-dark.json', data, (err) => {
      if (err) throw err;
      console.info('Theme successfully built!');
    });
  });
});
