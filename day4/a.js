// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
// input looks like this:
// 6-7, 9-10
// and we want to return an array of arrays, each array contains 4 numbers
const lines = input.split("\r\n").map((line) => {
	const [first, second] = line.split(",");
	console.log(first, second);
	const [firstStart, firstEnd] = first.split("-");
	const [secondStart, secondEnd] = second.split("-");
	return [
		parseInt(firstStart),
		parseInt(firstEnd),
		parseInt(secondStart),
		parseInt(secondEnd),
	];
});

let count = 0;

for (let first, second, third, fourth, i = 0; i < lines.length; i++) {
	[first, second, third, fourth] = lines[i];
    let is2ndIn1st = third >= first && fourth <= second;
    let is1stIn2nd = first >= third && second <= fourth;
    if (is2ndIn1st || is1stIn2nd) {
        count++;
    }
}

console.log(count);