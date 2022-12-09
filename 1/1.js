const fs = require("fs");

function sol() {
  let largest = 0;
  let current = 0;
  let set = new Set();
  const str = fs.readFileSync("./input.txt", "utf8");
  const calories = str.split("\n");
  for (const calorie of calories) {
    if (!calorie) {
      if (current > largest) {
        largest = current;
      }
      set.add(current);
      current = 0;
      continue;
    }
    current += Number(calorie);
  }

  const sorted = Array.from(set)
    .sort((a, b) => b - a)
    .slice(0, 3);
  console.log({ largest });
  console.log({ sorted });
  return sum(sorted);
}

function sum(arr) {
  let s = 0;
  for (const n of arr) s += n;
  return s;
}

console.log(sol());
