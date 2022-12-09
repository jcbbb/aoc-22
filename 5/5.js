const fs = require("fs");

function sol(file) {
  const stackMap = new Map();
  const str = fs.readFileSync(file, "utf8");
  const lines = str.split("\n");
  const emptyIndex = lines.findIndex((line) => line === "");
  const stacks = lines.slice(0, emptyIndex);

  for (let i = 0; i < stacks[0].length; i++) {
    const stack = [];
    for (let j = 0; j < stacks.length; j++) {
      const letter = stacks[j][i].trim();
      if (letter && letter !== "[" && letter !== "]") {
        if (letter.match(/\d+/g)) {
          stackMap.set(Number(letter), stack.slice(0));
          stack.length = 0;
        } else stack.push(letter);
      }
    }
  }

  const instructions = lines.slice(emptyIndex).filter(Boolean);
  for (const { count, from, to } of parseInstructions(instructions)) {
    const fromStack = stackMap.get(from);
    const toStack = stackMap.get(to);
    const deleted = fromStack.splice(0, count);
    toStack.unshift(...deleted.reverse().slice(0));
  }

  let result = "";

  for (const v of stackMap.values()) {
    result += v[0];
  }

  return result;
}

function sol2(file) {
  const stackMap = new Map();
  const str = fs.readFileSync(file, "utf8");
  const lines = str.split("\n");
  const emptyIndex = lines.findIndex((line) => line === "");
  const stacks = lines.slice(0, emptyIndex);

  for (let i = 0; i < stacks[0].length; i++) {
    const stack = [];
    for (let j = 0; j < stacks.length; j++) {
      const letter = stacks[j][i].trim();
      if (letter && letter !== "[" && letter !== "]") {
        if (letter.match(/\d+/g)) {
          stackMap.set(Number(letter), stack.slice(0));
          stack.length = 0;
        } else stack.push(letter);
      }
    }
  }

  const instructions = lines.slice(emptyIndex).filter(Boolean);
  for (const { count, from, to } of parseInstructions(instructions)) {
    const fromStack = stackMap.get(from);
    const toStack = stackMap.get(to);
    const deleted = fromStack.splice(0, count);
    toStack.unshift(...deleted.slice(0));
  }

  let result = "";

  for (const v of stackMap.values()) {
    result += v[0];
  }

  return result;
}

function parseInstructions(instructions) {
  const parsed = [];
  for (const instruction of instructions) {
    const [count, from, to] = instruction.match(/\d+/g).map(Number);
    parsed.push({ count, from, to });
  }

  return parsed;
}

console.log(sol2("./input.txt"));
