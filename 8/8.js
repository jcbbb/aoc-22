const fs = require("fs");

function isCurrentTaller(current) {
  return (tree) => current > tree;
}

function visibleTrees(current) {
  return (trees) => {
    let viewable = 0;
    for (const tree of trees) {
      if (tree >= current) {
        viewable += 1;
        break;
      } else viewable += 1;
    }

    return viewable;
  };
}

function calculateScore({
  current,
  leftTrees,
  rightTrees,
  topTrees,
  bottomTrees,
}) {
  const getVisible = visibleTrees(current);
  return (
    getVisible(leftTrees) *
    getVisible(rightTrees) *
    getVisible(topTrees) *
    getVisible(bottomTrees)
  );
}

function isTreeVisible({
  current,
  leftTrees,
  rightTrees,
  topTrees,
  bottomTrees,
}) {
  return [leftTrees, rightTrees, topTrees, bottomTrees].some((arr) =>
    arr.every(isCurrentTaller(current))
  );
}

function sol(file) {
  const str = fs.readFileSync(file, "utf8");
  const lines = str.split("\n").filter(Boolean);
  const matrix = [];
  let visible = (lines[0].length - 1) * 4;
  let highestScore = 0;

  for (const line of lines) {
    matrix.push([...line].map(Number));
  }

  for (let i = 1; i < matrix[0].length - 1; i++) {
    for (let j = 1; j < matrix.length - 1; j++) {
      const current = matrix[i][j];
      const leftTrees = matrix[i].slice(0, j).reverse();
      const rightTrees = matrix[i].slice(j + 1);
      const topTrees = [];
      const bottomTrees = [];
      // const leftEdge = matrix[i][0];
      // const rightEdge = matrix[i][matrix.length - 1];
      // const bottomEdge = matrix[matrix.length - 1][j];
      // const topEdge = matrix[0][j];
      for (let k = 0; k < i; k++) {
        topTrees.unshift(matrix[k][j]);
      }

      for (let k = i + 1; k < matrix.length; k++) {
        bottomTrees.push(matrix[k][j]);
      }

      const score = calculateScore({
        current,
        rightTrees,
        leftTrees,
        topTrees,
        bottomTrees,
      });

      if (score > highestScore) highestScore = score;

      const isVisible = isTreeVisible({
        current,
        rightTrees,
        leftTrees,
        topTrees,
        bottomTrees,
      });

      if (isVisible) visible += 1;
    }
  }

  return { part1: visible, part2: highestScore };
}

console.log(sol("./input.txt"));
