const fs = require("fs");

function sol(file) {
  const str = fs.readFileSync(file, "utf8");
  const lines = str.split("\n");
}
