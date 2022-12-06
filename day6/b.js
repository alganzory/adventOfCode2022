// read input from input.txt file
const input = require("fs").readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const line = input.split("\r\n").map((line) => line.replace("\r", ""))[0].split("");

// the fastest solution I can think of, I was aiming to finish it in the first 15mins lol
for (let i = 0, j=14; i < line.length, j<line.length; i++, j++) {
    const arr =  (line.slice(i, j));
    const set = new Set(arr);
    if (arr.length === set.size) {
        console.log("VOILA", j);
        break;
    }
}

