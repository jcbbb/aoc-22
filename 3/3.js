const fs = require("fs");

function sol(file) {
  const str = fs.readFileSync(file, "utf8");
  const rucks = str.split("\n");

  const commons = [];
  for (const ruck of rucks) {
    let found = "";
    const halfIndex = Math.floor(ruck.length / 2);
    const firstHalf = ruck.slice(0, halfIndex);
    const secondHalf = ruck.slice(halfIndex);
    for (let i = 0, len = firstHalf.length; i < len; i++) {
      if (secondHalf.indexOf(firstHalf[i]) !== -1) {
        found = firstHalf[i];
      }
    }
    commons.push(found);
  }

  return sum(commons, getPriority);
}

function sum(arr, mod) {
  let sum = 0;
  for (const item of arr) sum += mod(item);
  return sum;
}

function isUpperCase(str) {
  return str.toUpperCase() === str;
}

function getPriority(letter) {
  const code = letter.charCodeAt();
  if (!code) return 0;
  if (isUpperCase(letter)) {
    return code - 64 + 26;
  }

  return code - 96;
}

function sol2(file) {
  const str = fs.readFileSync(file, "utf8");
  const rucks = str.split("\n").filter(Boolean);
  const groups = group(rucks, 3);
  const commons = [];
  for (const group of groups) {
    let found = "";
    const [first, second, third] = group;
    for (let i = 0, len = first.length; i < len; i++) {
      const letter = first[i];
      if (second.indexOf(letter) !== -1 && third.indexOf(letter) !== -1) {
        found = letter;
      }
    }
    commons.push(found);
  }

  return sum(commons, getPriority);
}

function group(arr, count) {
  const groups = [];
  for (let i = 0, end = arr.length / count; i < end; i++) {
    groups.push(arr.slice(i * count, (i + 1) * count));
  }

  return groups;
}

console.log(sol2("./input.txt"));
