const fs = require("fs");

function initialSignal(count, str) {
  let signal = "";
  for (let i = 0; i < count; i++) {
    signal += str[i];
  }

  return signal;
}
function sol(file) {
  const str = fs.readFileSync(file, "utf8");

  let signal = initialSignal(14, str);
  if (isUnique(signal)) return 14;

  for (let i = 14; i < str.length; i++) {
    signal = signal.slice(1) + str[i];
    if (isUnique(signal)) {
      return i + 1;
    }
  }
}

function isUnique(str) {
  let existing = [];
  for (let i = 0; i < str.length; i++) {
    if (existing.includes(str[i])) {
      return false;
    } else existing.push(str[i]);
  }

  return true;
}

console.log(sol("./input.txt"));
