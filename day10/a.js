// read input from input.txt file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let signals = []; //array of 8 values

let SIGNAL_CHECKPOINTS = [20, 60, 100, 140, 180, 220];
let acc = {
	cycles: 0,
	signals: 1,
};
lines.forEach((line) => {
	const [cycles, value] = line
		.split(" ")
		.map((value, idx) =>
			idx ? parseInt(value) : value === "addx" ? 2 : 1
		);
	for (let i = 0; i < cycles; i++) {
		acc.cycles += 1;
		if (SIGNAL_CHECKPOINTS.includes(acc.cycles)) signals.push(acc.signals * acc.cycles);
	}
	acc.signals += (cycles > 1 ? value : 0);
});

console.log(signals.reduce((acc, signal) => acc + signal), 0);

