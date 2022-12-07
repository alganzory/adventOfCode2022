// read input from input.txt file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

const createEmptyFileOfSize = (fileName, size) => {
	// Check size
	if (size < 0) {
		console.log("Error: a negative size doesn't make any sense");
		return;
	}

	try {
		// Open the file for writing; 'w' creates the file
		// (if it doesn't exist) or truncates it (if it exists)
		fd = fs.openSync(fileName, "w");
		if (size > 0) {
			// Write one byte (with code 0) at the desired offset
			// This forces the expanding of the file and fills the gap
			// with characters with code 0
			fs.writeSync(fd, Buffer.alloc(1), 0, 1, size - 1);
		}
		// Close the file to commit the changes to the file system
		fs.closeSync(fd);

	} catch (error) {
		console.log ("Error: " + error);
	}
	// Create the file after the processing of the current JavaScript event loop
};

lines.forEach((line) => {
	if (line.startsWith("dir ")) {
		const dirName = line.replace("dir ", "");
		fs.mkdirSync(dirName);
		console.log(dirName);
	} else if (line.startsWith("$ cd ")) {
		const dirName = line.replace("$ cd ", "");
		process.chdir(dirName);
	} else if (line.startsWith("$ ls")) {
	} else {
		const [fileSize, fileName] = line.split(" ");
		createEmptyFileOfSize(fileName, fileSize);
	}
});
