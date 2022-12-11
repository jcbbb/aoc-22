const fs = require("fs");

function sol(file) {
  const str = fs.readFileSync(file, "utf8");
  const lines = str.split("\n");
  const pwd = [];
  const sizes = {};

  for (const line of lines) {
    const [first, second, third] = line.split(" ");
    if (first === "$") {
      if (second === "cd") {
        if (third === "..") {
          pwd.pop();
          continue;
        } else {
          if (pwd.length) {
            const prefix = pwd.filter((p) => p !== "/").join("/");
            pwd.push(prefix + "/" + third);
          } else pwd.push(third);
          continue;
        }
      }
      if (second === "ls") continue;
    }

    if (first === "dir") {
      continue;
    }

    if (first) {
      for (let i = pwd.length - 1; i >= 0; i--) {
        const dir = pwd[i];
        if (!sizes[dir]) sizes[dir] = 0;
        sizes[dir] += Number(first);
      }
    }
  }

  const available = 70000000;
  const used = sizes["/"];
  const unused = available - used;
  const needed = 30000000 - unused;
  const part1 = sum(Object.values(sizes).filter((size) => size < 100000));
  const part2 = Math.min(
    ...Object.values(sizes).filter((size) => size >= needed)
  );

  return { part1, part2 };
}

function sum(arr) {
  let count = 0;
  for (const item of arr) count += item;
  return count;
}

console.log(sol("./input.txt"));
