// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let stacks = [];
const parseStack = (line) => {
	if (!line.includes("[")) return;

	for (let i = 1, j = 0; i < line.length; i += 4, j++) {
		const stackItem = line[i];
		if (stacks[j] === undefined) {
			stacks[j] = [];
		}
		if (stackItem !== " ") {
			stacks[j].unshift(stackItem);
		}
	}
};

let instructions = [];
const parseInstructions = (line) => {
	const lineWithoutWords = line
		.replace("move ", "")
		.replace(" from ", " ")
		.replace(" to ", " ");
	const [amount, fromStack, toStack] = lineWithoutWords.split(" ");
	instructions.push({
		amount: parseInt(amount),
		fromStack: parseInt(fromStack),
		toStack: parseInt(toStack),
	});
};

let nextLineIsInstructions = false;
for (const line of lines) {
	if (line === "") {
		nextLineIsInstructions = true;
		continue;
	}
	if (nextLineIsInstructions) {
		parseInstructions(line);
	} else {
		parseStack(line);
	}
}

for (const instruction of instructions) {
	const { amount, fromStack, toStack } = instruction;
	const fromStackArray = stacks[fromStack - 1];
	const toStackArray = stacks[toStack - 1];
	const start = fromStackArray.length - amount;
	const items = fromStackArray.splice(start, fromStackArray.length);
	toStackArray.push(...items);
}

const topItems = stacks.reduce((acc, stack) => {
	acc += stack.pop();
	return acc;
}, "");
console.log("topItems-", topItems);
