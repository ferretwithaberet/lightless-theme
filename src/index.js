const fs = require('fs');
const Color = require('color');

// Colors
const primary = Color("#118000");
const black = Color('#000000');
const white = Color('#ffffff');
// Transparency levels
const transparency1 = Math.round(.25 * 255).toString(16);
const transparency2 = Math.round(.5 * 255).toString(16);
const transparency3 = Math.round(.75 * 255).toString(16);

theme = {
    // Basic colors
    "primary": primary.hex(),
    "error": "#C43235",
    "black": black.hex(),
    "white": white.hex(),
    "grey": white.darken(.47).hex(),
    "transparent": '#00000000',
    // Base backgrounds
    "primaryBackground": white.darken(.98).hex(),
    "secondaryBackground": white.darken(.93).hex(),
    // Shades of primary
    "primaryLighter": primary.lighten(.25).hex(),
    "primaryHover": primary.darken(.15).hex(),
    "primaryDarker": primary.darken(.25).hex(),
    "primary-1": primary.hex() + transparency1,
    "primary-2": primary.hex() + transparency2,
    "primary-3": primary.hex() + transparency3,
    // Shades of transparent
    "darken-1": black.hex() + transparency1,
    "darken-2": black.hex() + transparency2,
    "darken-3": black.hex() + transparency3,
    "lighten-1": white.hex() + transparency1,
    "lighten-2": white.hex() + transparency2,
    "lighten-3": white.hex() + transparency3
};

// Create theme file
fs.readFile('./src/template-theme.json', 'utf8', (err, data) => {
    if (err) throw err;
    // For each key in theme, replace it in the theme data
    for (key in theme) {
        data = data.split(`\${${ key }}`).join(theme[key]);
    };

    // Make sure dist/themes/ exists
    fs.mkdir('./dist/themes/', { recursive: true }, (err) => {
        if (err) throw err;
        // Write new data to dist theme
        fs.writeFile('./dist/themes/lightless-dark.json', data, err => {
            if (err) throw err;
            console.info('Theme successfully built!')
        });
    });
});
