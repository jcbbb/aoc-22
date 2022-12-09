const fs = require("fs");

// (A = Rock), (B = Paper), (C = Scissors);
// (X = Rock), (Y = Paper), (Z = Scissors);

const scoreMap = {
  "B X": 1,
  "A Z": 3,
  "A Y": 8,
  "C Z": 6,
  "B Y": 5,
  "C X": 7,
  "C Y": 2,
  "B Z": 9,
  "A X": 4,
};

function sol() {
  const str = fs.readFileSync("./input.txt", "utf8");
  const strategies = str.split("\n");
  let total = 0;

  for (const strat of strategies) {
    if (scoreMap[strat]) total += scoreMap[strat];
  }

  return total;
}

function sol2() {
  const str = fs.readFileSync("./input.txt", "utf8");
  const strategies = str.split("\n");
  let total = 0;
  for (const strat of strategies) {
    const [opponentMove, yourMove] = strat.split(" ");
    if (opponentMove === "A") {
      if (yourMove === "X") {
        total += 3;
      }

      if (yourMove === "Y") {
        total += 4;
      }

      if (yourMove === "Z") {
        total += 8;
      }
    }

    if (opponentMove === "B") {
      if (yourMove === "X") {
        total += 1;
      }
      if (yourMove === "Y") {
        total += 5;
      }
      if (yourMove === "Z") {
        total += 9;
      }
    }

    if (opponentMove === "C") {
      if (yourMove === "X") {
        total += 2;
      }

      if (yourMove === "Y") {
        total += 6;
      }

      if (yourMove === "Z") {
        total += 7;
      }
    }
  }

  return total;
}

console.log(sol2());
