// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let currentDirectory = "/";

let directoriesChildren = new Map();
let directoriesFiles = new Map();
let directoriesSizes = new Map();

const handleCd = (dirName) => {
	if (dirName === "..") {
		// remove last directory from currentDirectory
		currentDirectory =
			currentDirectory.split("/").slice(0, -2).join("/") + "/";
	} else {
		currentDirectory += dirName + "/";
	}
};
const handleDir = (dirName) => {
	const uniqueDirName = currentDirectory + dirName + "/";
	if (directoriesChildren.has(currentDirectory)) {
		directoriesChildren.get(currentDirectory).push(uniqueDirName);
	} else {
		directoriesChildren.set(currentDirectory, [uniqueDirName]);
	}
};
const handleFile = (fileSize, fileName) => {
	if (directoriesFiles.has(currentDirectory)) {
		directoriesFiles.get(currentDirectory).add(fileName + " " + fileSize);
	} else {
		directoriesFiles.set(
			currentDirectory,
			new Set([fileName + " " + fileSize])
		);
	}

	// recalculate size of current directory
	let currentSize = 0;
	Array.from(directoriesFiles.get(currentDirectory)).forEach((file) => {
		const [fileName, fileSize] = file.split(" ");
		currentSize += parseInt(fileSize);
	});

	if (directoriesSizes.has(currentDirectory)) {
		directoriesSizes.set(currentDirectory, currentSize);
	} else {
		directoriesSizes.set(currentDirectory, currentSize);
	}
};

for (let i = 2; i < lines.length; i++) {
	const line = lines[i];
	if (line.startsWith("$ cd ")) handleCd(line.replace("$ cd ", ""));
	else if (line.startsWith("dir ")) handleDir(line.replace("dir ", ""));
	else if (line.startsWith("$ ls")) continue;
	else handleFile(...line.split(" "));
}

let actualSizes = new Map();
const recursivelyRecalculateSizes = (dir) => {
	const currentSize = directoriesSizes.has(dir)
		? directoriesSizes.get(dir)
		: 0;
	const children = directoriesChildren.get(dir);

	if (!children) {
		actualSizes.set(dir, currentSize);
	} else {
		let actualSize = currentSize;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (!actualSizes.has(child)) recursivelyRecalculateSizes(child);

			const childSize = actualSizes.get(child);
			actualSize += childSize;
		}
		actualSizes.set(dir, actualSize);
	}
};

recursivelyRecalculateSizes("/");

let sumOfAtMost100000 = 0;

Array.from(actualSizes.values()).forEach((size) => {
	if (size <= 100000) sumOfAtMost100000 += size;
});

console.log(sumOfAtMost100000);
