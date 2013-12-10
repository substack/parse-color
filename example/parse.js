var parse = require('../');
var color = process.argv.slice(2).join(' ');
console.log(parse(color));
