
const EventEmitter = require('events');

// JavaScript ES6 
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');

setTimeout(() => {
  console.log('timeout');
}, 1000);

for(let i = 0; i < 12; i++) {
	setTimeout(() => {
	  console.log('timeout: ' + i );
	}, (i+1)*1000);	
}