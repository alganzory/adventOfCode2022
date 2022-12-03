// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let repeatedChars = [];
for (let i = 0; i < lines.length; i++) {
	let letterCount = {};
	const line = lines[i];
	for (let j = 0; j < line.length; j++) {
		const char = line[j];
		const is2ndHalf = j >= line.length / 2;
		if (letterCount[char] && is2ndHalf) {
			letterCount[char]++;
			repeatedChars.push(char);
			break;
		} else {
			if (!is2ndHalf) letterCount[char] = 1;
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
