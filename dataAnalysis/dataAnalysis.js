
var Series = require('pandas-js').Series;
var DataFrame = require('pandas-js').DataFrame;

const ds_1 = new Series([5, 6, 7, 8], {name: 'My Data 1'});

console.log('This is a Series');
console.log(ds_1.toString());
console.log(`Sum: ${ds_1.sum()}`);
console.log(`Standard deviation: ${ds_1.std()}`);

console.log();

console.log('This is a Data Frame');
const df = new DataFrame([{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}])
console.log(df.toString());





