const moment = require('moment');

var date = moment();
date.add(1,'y').subtract(6,'month');
console.log(date.format('MMM Do, YYYY'));

var time = moment();
console.log(time.format('h:mm A'));

console.log(moment().valueOf());