var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: ['./build/**/**', '!./build/config.json'], // use the glob format
    platforms: ['win', 'linux', 'osx'],
    version: '0.12.3',
    buildDir: "./bin"
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});