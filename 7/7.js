const fs = require("fs");

function sol(file) {
  const str = fs.readFileSync(file, "utf8");
}

console.log(sol("./sample.txt"));
