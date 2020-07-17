function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let time = performance.now();
const data = new Array(100000).fill(0).map(x => getRndInteger(2, 100000));
console.log(`${data.length} entries generated in: ${performance.now() - time}`);

export const testData = data;