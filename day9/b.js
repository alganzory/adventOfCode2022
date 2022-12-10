// read input from input.txt file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const DIRECTIONS = {
	R: "RIGHT",
	L: "LEFT",
	U: "UP",
	D: "DOWN",
};
// there's probably a cleaner way bu couldn't be bothered
const lines = input.split("\r\n").map((line) =>
	line
		.replace("\r", "")
		.split(" ")
		.map((char) => DIRECTIONS[char] ?? parseInt(char))
);

//  observation1: T only moves once everytime it can't touch H
// where T moves only kinda matters so we don't recount something we have counted already\
// to determine where T moves, isn't all that hard, we can have a flag that tells us if H is on the diagonal
// we can use a set to store the places T has mvoed to, and the size of the set would be the number we want
// for part b, it's the same concept, just make it a chain 


const DISPLACEMENT_TYPE = {
	horizontalLeft: 1,
	horizontalRight: 2,
	verticalUp: 3,
	verticalDown: 4,
	diagonalUpLeft: 5,
	diagonalUpRight: 6,
	diagonalDownLeft: 7,
	diagonalDownRight: 8,
};

let nodesVisitedBy9 = new Set();
nodesVisitedBy9.add("0,0");

const hNode = {
	row: 0,
	col: 0,
	set moveNode(direction) {
		switch (direction) {
			case DIRECTIONS.U:
				this.row -= 1;
				break;
			case DIRECTIONS.D:
				this.row += 1;
				break;
			case DIRECTIONS.L:
				this.col -= 1;
				break;
			case DIRECTIONS.R:
				this.col += 1;
				break;
		}
	},
};

class Tnode {
	constructor(parent, label, row = 0, col = 0) {
		this.parent = parent;
		this.label = label;
		this.row = row;
		this.col = col;
	}

	catchup(displacementType) {
		switch (displacementType) {
			case DISPLACEMENT_TYPE.horizontalLeft:
				this.col--;
				break;
			case DISPLACEMENT_TYPE.horizontalRight:
				this.col++;
				break;
			case DISPLACEMENT_TYPE.verticalUp:
				this.row--;
				break;
			case DISPLACEMENT_TYPE.verticalDown:
				this.row++;
				break;
			case DISPLACEMENT_TYPE.diagonalUpRight:
				this.row--;
				this.col++;
				break;
			case DISPLACEMENT_TYPE.diagonalUpLeft:
				this.row--;
				this.col--;
				break;
			case DISPLACEMENT_TYPE.diagonalDownRight:
				this.row++;
				this.col++;
				break;
			case DISPLACEMENT_TYPE.diagonalDownLeft:
				this.row++;
				this.col--;
				break;
		}
		if (this.label === 9) nodesVisitedBy9.add(`${this.row},${this.col}`);
	}

	get needToMove() {
		let pCol = this.parent.col;
		let pRow = this.parent.row;
		const horizDiff = pCol - this.col;
		const vertDiff = pRow - this.row;

		const hLeftOrRight = horizDiff > 0 ? "Right" : "Left";
		const vUpOrDown = vertDiff > 0 ? "Down" : "Up";
		if (Math.abs(horizDiff) > 1)
			return vertDiff
				? DISPLACEMENT_TYPE[`diagonal${vUpOrDown}${hLeftOrRight}`]
				: DISPLACEMENT_TYPE[`horizontal${hLeftOrRight}`];
		if (Math.abs(vertDiff) > 1)
			return horizDiff
				? DISPLACEMENT_TYPE[`diagonal${vUpOrDown}${hLeftOrRight}`]
				: DISPLACEMENT_TYPE[`vertical${vUpOrDown}`];
		return 0;
	}
}

let ropeBody = [];

ropeBody[1] = new Tnode(hNode, 1, 0, 0);
for (let i = 2; i <= 9; i++) {
	ropeBody[i] = new Tnode(ropeBody[i - 1], i);
}

for (let [direction, distance] of lines) {
	for (let i = 0; i < distance; i++) {
		hNode.moveNode = direction;
		let displacementType = ropeBody[1].needToMove;
		if (!displacementType) continue; 
		ropeBody[1].catchup(displacementType);
		for( let j=2; j<ropeBody.length; j++ ) {
			let node = ropeBody[j];
			let displacementType = node.needToMove;
			if (!displacementType) break;
			node.catchup(displacementType);
		};
	}
}

console.log(nodesVisitedBy9.size);
