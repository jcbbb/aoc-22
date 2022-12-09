const fs = require("fs");

function sol(file) {
  const str = fs.readFileSync(file, "utf8");
  const assignments = str.split("\n").filter(Boolean);
  let count = 0;
  for (const assignment of assignments) {
    const [range1, range2] = assignment.split(",");
    if (doesContainEachOther(range1, range2)) count++;
  }
  return count;
}

function doesContainEachOther(range1, range2) {
  const [from, to] = range1.split("-").map(Number);
  const [from2, to2] = range2.split("-").map(Number);
  if (from <= from2 && to >= to2) return true;
  if (from2 <= from && to2 >= to) return true;
  return false;
}

function sol2(file) {
  const str = fs.readFileSync(file, "utf8");
  const assignments = str.split("\n").filter(Boolean);
  let count = 0;
  for (const assignment of assignments) {
    const [range1, range2] = assignment.split(",");
    if (doesOverlap(range1, range2)) count++;
  }
  return count;
}

function doesOverlap(range1, range2) {
  const [from, to] = range1.split("-").map(Number);
  const [from2, to2] = range2.split("-").map(Number);

  return from <= to2 && from2 <= to;
}

console.log(sol2("./input.txt"));

