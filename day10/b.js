// read input from input.txt file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let litPixels = [Array(40).fill('.')]; //array of arrays

let acc = {
	cycles: 0,
	xPosition: 1,
};

let crt = 0;
let crtRow = 0;
const increaseCrt = () => {
	crt++;
	crtRow += Math.floor(crt / 40);
	crt %= 40;
};
const getSpriteArr = (xPosition) => {
	return [xPosition - 1, xPosition, xPosition + 1];
};

const markLitPixels = () => {
	if (!litPixels[crtRow]) litPixels.push(Array(40).fill('.'));
	litPixels[crtRow][crt] = '#';
};
lines.forEach((line) => {
	const [cycles, value] = line
		.split(" ")
		.map((value, idx) =>
			idx ? parseInt(value) : value === "addx" ? 2 : 1
		);
	for (let i = 0; i < cycles; i++) {
		const sprite = getSpriteArr(acc.xPosition);
		if (sprite.includes(crt)) markLitPixels();
		acc.cycles += 1;
		increaseCrt();
	}
	acc.xPosition += cycles > 1 ? value : 0;
});


// write litPixels to output.txt
const output = litPixels.map((row) => row.join('')).join('\r\n');
fs.writeFileSync("output.txt", output, "utf8");

