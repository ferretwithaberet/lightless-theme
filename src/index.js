const fs = require('fs');
const theme = require('./schemes/purple.json');


fs.readFile('./src/themes/lightless-dark.json', 'utf8', (err, data) => {
    if (err) throw err;
    // For each key in theme, replace it in the theme data
    for (key in theme) {
        const pattern = new RegExp(`\\$\\{${key}\\}`, 'g');
        data = data.replace(pattern, theme[key]);
    };

    // Make sure dist/themes/ exists
    fs.mkdir('./dist/themes/', { recursive: true }, (err) => {
        if (err) throw err;
    });

    // Write new data to dist theme
    fs.writeFile('./dist/themes/lightless-dark.json', data, err => {
        if (err) throw err;
        console.log('Theme successfully built!')
    });
});
