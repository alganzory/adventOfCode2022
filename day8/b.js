// read input from input.txt file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let width = lines[0].length;
let height = lines.length;
let array2d = [];

for (let i = 0; i < lines.length; i++) {
	array2d.push(
		lines[i].split("").map((char, idx) => {
			return {
				row: i,
				col: idx,
				value: parseInt(char),
				visited: {
					top: false,
					right: false,
					bottom: false,
					left: false,
				},
				neighbourTop: i > 0 ? { row: i - 1, col: idx } : null,
				neighbourRight:
					idx < width - 1 ? { row: i, col: idx + 1 } : null,
				neighbourBottom:
					i < height - 1 ? { row: i + 1, col: idx } : null,
				neighbourLeft: idx > 0 ? { row: i, col: idx - 1 } : null,

				distLeft: 0,
				distRight: 0,
				distTop: 0,
				distBottom: 0,
				get totalDist() {
					return (
						this.distTop *
						this.distRight *
						this.distBottom *
						this.distLeft
					);
				},
			};
		})
	);
}
const calculateDistanceToDirection = (threshold, tree, direction) => {
	const nbName = `neighbour${direction}`;
	if (tree[nbName] === null) {
		return 0;
	}
	const nb = array2d[tree[nbName].row][tree[nbName].col];
	if (nb.value < threshold) {
		return 1 + calculateDistanceToDirection(threshold, nb, direction);
	}
	return 1;
};

let maxSoFar = -1;
let maxTree = null;
for (let i = 0; i < height; i++) {
	for (let j = 0; j < width; j++) {
		const tree = array2d[i][j];
		tree.distTop = calculateDistanceToDirection(tree.value, tree, "Top");
		tree.distRight = calculateDistanceToDirection(
			tree.value,
			tree,
			"Right"
		);
		tree.distBottom = calculateDistanceToDirection(
			tree.value,
			tree,
			"Bottom"
		);
		tree.distLeft = calculateDistanceToDirection(tree.value, tree, "Left");
		const totalDist = tree.totalDist;
		maxSoFar = Math.max(maxSoFar, totalDist);
		if (maxSoFar === totalDist) {
			maxTree = tree;
		}
	}
}

console.log(maxSoFar);
