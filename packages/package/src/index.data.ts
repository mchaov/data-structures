// This file is used to generate data for benchmarks
/* istanbul ignore file */
function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTestData(length: number) {
    let time = performance.now();
    const data = new Array(length).fill(0).map(x => getRndInteger(2, length));
    console.log(`${data.length} entries generated in: ${performance.now() - time}`);
    return data;
};