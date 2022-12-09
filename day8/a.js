// read input from input.txt file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// there's probably a cleaner way but couldn't be bothered
const lines = input.split("\r\n").map((line) => line.replace("\r", ""));

let width = lines[0].length;
let height = lines.length;
let array2d = [];

for (let i = 0; i < lines.length; i++) {
	array2d.push(
		lines[i].split("").map((char, idx) => {
			return {
				row: i,
				col: idx,
				value: parseInt(char),
				visited: {
					top: false,
					right: false,
					bottom: false,
					left: false,
				},
				neighbourTop: i > 0 ? { row: i - 1, col: idx } : null,
				neighbourRight:
					idx < width - 1 ? { row: i, col: idx + 1 } : null,
				neighbourBottom:
					i < height - 1 ? { row: i + 1, col: idx } : null,
				neighbourLeft: idx > 0 ? { row: i, col: idx - 1 } : null,

				maxTop: -1,
				maxBottom: -1,
				maxLeft: -1,
				maxRight: -1,
				get getMaxLeft() {
					if (this.visited.left) return this.maxLeft;
					this.visited.left = true;
					this.maxLeft = this.neighbourLeft
						? array2d[this.neighbourLeft.row][
								this.neighbourLeft.col
						  ].getMaxLeft
						: this.value;
					return this.maxLeft;
				},
				set setMaxLeft(value) {
					this.maxLeft = value;
				},
				get getMaxRight() {
					if (this.visited.right) return this.maxRight;
					this.visited.right = true;
					this.maxRight = this.neighbourRight
						? array2d[this.neighbourRight.row][
								this.neighbourRight.col
						  ].getMaxRight
						: this.value;
					return this.maxRight;
				},
				set setMaxRight(value) {
					this.maxRight = value;
				},
				get getMaxTop() {
					if (this.visited.top) return this.maxTop;
					this.visited.top = true;
					this.maxTop = this.neighbourTop
						? array2d[this.neighbourTop.row][this.neighbourTop.col]
								.getMaxTop
						: this.value;

					return this.maxTop;
				},
				set setMaxTop(value) {
					this.maxTop = value;
				},
				get getMaxBottom() {
					if (this.visited.bottom) return this.maxBottom;
					this.visited.bottom = true;
					this.maxBottom = this.neighbourBottom
						? array2d[this.neighbourBottom.row][
								this.neighbourBottom.col
						  ].getMaxBottom
						: this.value;
					return this.maxBottom;
				},

				set setMaxBottom(value) {
					this.maxBottom = value;
				},

				vt: false,
				get visibleTop() {
					if (i === 0) {
						this.maxTop = this.value;
						this.vt = true;
						return true;
					}
					if (this.value > this.getMaxTop) {
						this.setMaxTop = this.value;
						this.vt = true;
						return true;
					}
					this.vt = false;
					return false;
				},
				vr: false,
				get visibleRight() {
					if (idx === width - 1) {
						this.maxRight = this.value;
						this.vr = true;
						return true;
					}
					if (this.value > this.getMaxRight) {
						this.setMaxRight = this.value;
						this.vr = true;
						return true;
					}
					this.vr = false;
					return false;
				},
				vb: false,
				get visibleBottom() {
					if (i === height - 1) {
						this.maxBottom = this.value;
						this.vb = true;
						return true;
					}

					if (this.value > this.getMaxBottom) {
						this.setMaxBottom = this.value;
						this.vb = true;
						return true;
					}
					this.vb = false;
					return false;
				},

				vl: false,
				get visibleLeft() {
					if (idx === 0) {
						this.maxLeft = this.value;
						this.vl = true;
						return true;
					}
					if (this.value > this.getMaxLeft) {
						this.setMaxLeft = this.value;
						this.vl = true;
						return true;
					}
					this.vl = false;
					return false;
				},
				get visibleAtAll() {
					return +(this.vt + this.vr + this.vb + this.vl) > 0;
				},
			};
		})
	);
}

let visibleTreesCalc = 0;

for (let i = array2d.length - 1; i >= 0; i--) {
	for (let j = array2d[0].length - 1; j >= 0; j--) {
		array2d[i][j].visibleBottom;
		array2d[i][j].visibleRight;
	}
}

for (let i = 0; i < array2d.length; i++) {
	for (let j = 0; j < array2d[0].length; j++) {
		array2d[i][j].visibleTop;
		array2d[i][j].visibleLeft;

		visibleTreesCalc += array2d[i][j].visibleAtAll;
	}
}

console.log(visibleTreesCalc);
