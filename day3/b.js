// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let repeatedChars = [];
let letterCount = {};
for (let i = 0; i < lines.length; i++) {
	console.log("letterCount", letterCount);
	const line = lines[i];
	const lineOrder = i % 3;
	const isNext3 = lineOrder === 0;
	if (isNext3) {
		console.log("next 3",i);
		letterCount = {};
	}
	const lineSet = new Set(line);
	for (let char of lineSet) {
		if (letterCount[char]) {
			letterCount[char]++;
		} else {
			letterCount[char] = 1;
		}
		if (letterCount[char] === 3) {
			repeatedChars.push(char);
			break;
		}
	}
}

const Acode = "A".charCodeAt(0);
const aCode = "a".charCodeAt(0);
const sum = repeatedChars.reduce((acc, curr) => {
	const code = curr.charCodeAt(0);
	if (code < aCode) {
		return acc + (code - Acode + 1) + 26;
	}
	return acc + (code - aCode + 1);
}, 0);

console.log(repeatedChars, sum);
