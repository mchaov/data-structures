function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTestData(length: number) {
    let time = performance.now();
    const data = new Array(length).fill(0).map(x => getRndInteger(2, 100000));
    console.log(`${data.length} entries generated in: ${performance.now() - time}`);
    return data;
};