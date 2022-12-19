const colors = require("colors");
const EventEmitter = require('events');

class TimerEmitter extends EventEmitter { };
const emitter = new TimerEmitter();

emitter.on('timerRun', ([userDate, timer]) => {

  const currentDate = new Date();

  if (currentDate >= userDate) {
    emitter.emit('timerEnd', timer);
  } else if (isNaN(userDate)) {
    emitter.emit('error', timer)
  } else {
    console.log(colors.yellow(getPrettyTime((userDate - currentDate) / 1000), "осталось"));
  }
});

emitter.on('timerEnd', (timer) => {
  console.log(colors.green("время вышло"));
  clearInterval(timer);
});

emitter.on('error', (timer) => {
  console.log(colors.red("введите корректную дату в формате: час-день-месяц-год"));
  clearInterval(timer);
});

const getPrettyTime = seconds => {
  const arr = [
    Math.floor(seconds % 60),
    Math.floor((seconds / 60) % 60),
    Math.floor((seconds / (60 * 60)) % 24),
    Math.floor(seconds / (60 * 60 * 24)),
  ];
  return `${arr.pop()} days ${arr.pop()} hours ${arr.pop()} minutes ${arr.pop()} seconds`;
};

const [hour, day, month, year] = process.argv[2].split("-");
const userDate = new Date(Date.UTC(year, month - 1, day, hour));

const start = (userDate) => {
  setInterval(function () {
    emitter.emit("timerRun", [userDate, this]);
  }, 1000);
};

start(userDate);