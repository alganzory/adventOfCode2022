// read input from input.txt file
const input = require('fs').readFileSync('input.txt', 'utf8');

// there's probably a cleaner way but couldn't be bothered
const lines = input.split('\r\n').map(line => {
    const withoutNew  = line.replace('\r', '');
    return withoutNew === '' ? null : parseInt(withoutNew);
});

let sums = [];
const ac = lines.reduce((acc, curr) => {
    if (curr === null) {
        sums.push(acc);
        return 0;
    }
    return acc + curr;
}, 0);

sums = sums.sort((a, b) => -a + b);
console.log (sums[0] + sums[1]+ sums[2]); 