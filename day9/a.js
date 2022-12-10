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

const needToMove = (tRow, tCol, hRow, hCol) => {
	const horizDiff = hCol - tCol;
	const vertDiff = hRow - tRow;

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
};

let nodesVisitedByT = new Set();
nodesVisitedByT.add("0,0");

const hNode = {
	row: 0,
	col: 0,
	set moveNode( direction ) {
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
const tNode = {
	row: 0,
	col: 0,
	set catchup(displacementType) {
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
		nodesVisitedByT.add(`${this.row},${this.col}`);
	},
};

for (let [direction, distance] of lines) {
    for (let i=0; i< distance; i++ ) {
	hNode.moveNode =  direction ;
	let displacementType = needToMove(
		tNode.row,
		tNode.col,
		hNode.row,
		hNode.col
	);
	if (!displacementType) continue;
	else tNode.catchup = displacementType;
    }
}

console.log(nodesVisitedByT.size);
