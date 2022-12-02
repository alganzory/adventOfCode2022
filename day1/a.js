// read input from input.txt file
const input = require('fs').readFileSync('input.txt', 'utf8');

// there's probably a cleaner way but couldn't be bothered
const lines = input.split('\r\n').map(line => {
    const withoutNew  = line.replace('\r', '');
    return withoutNew === '' ? null : parseInt(withoutNew);
});

console.log(lines);

let maxSoFar = -1;
const ac = lines.reduce((acc, curr) => {
    if (curr === null) {
        maxSoFar = Math.max(maxSoFar, acc);
        return 0;
    }
    return acc + curr;
}, 0);

console.log ("maxSoFar", maxSoFar);