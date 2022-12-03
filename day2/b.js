// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

// A is rock, B is paper, C is scissors, X is rock, Y is paper, Z is scissors
const GAME_MAP = {
	"A X": 4, //rock rock
	"A Y": 8, // rock paper
	"A Z": 3, // rock scissors
	"B X": 1, // paper rock
	"B Y": 5, // paper paper
	"B Z": 9, // paper scissors
	"C X": 7, // scissors rock
	"C Y": 2, // scissors paper
	"C Z": 6, // scissors scissors
};

// A is rock, B is paper, C is scissors, X is lose, Y is draw, Z is win
const RESULTS_MAP = {
	"A X": GAME_MAP["A Z"], //to lose, you need to select scissors (Z)
	"A Y": GAME_MAP["A X"], //to draw, you need to select rock (X)\
	"A Z": GAME_MAP["A Y"], //to win, you need to select paper (Y)
	"B X": GAME_MAP["B X"], //to lose, you need to select rock (X)
	"B Y": GAME_MAP["B Y"], //to draw, you need to select paper (Y)
	"B Z": GAME_MAP["B Z"], //to win, you need to select scissors (Z)
	"C X": GAME_MAP["C Y"], //to lose, you need to select rock (Y)
	"C Y": GAME_MAP["C Z"], //to draw, you need to select paper (Z)
	"C Z": GAME_MAP["C X"], //to win, you need to select scissors (X)
};

const sum = lines.reduce((acc, line) => {
	return acc + RESULTS_MAP[line];
}, 0);

console.log(sum);
