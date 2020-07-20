import "./index.less";

export function init() { }

export * from "./priority-queue";
import { PriorityQueue } from "./priority-queue";
import { getTestData } from "./index.data";

let time = performance.now();
var pq = new PriorityQueue<number>({
    initialData: getTestData(5000000),
    priorityPredicate: (a, b) => a - b
});
// testData.forEach(x => pq.enqueue(x));
console.log(`Added ${pq.count} elements to priority queue in ${performance.now() - time}`);

time = performance.now();
pq.enqueue(1);
console.log("ms to add first element", performance.now() - time);

time = performance.now();
pq.enqueue(pq.count + 10);
console.log("ms to add last element", performance.now() - time);

time = performance.now();
pq.enqueue(5000);
console.log("ms to add 5000", performance.now() - time);

time = performance.now();
pq.enqueue(25000);
console.log("ms to add 25000", performance.now() - time);

time = performance.now();
pq.enqueue(75000);
console.log("ms to add 75000", performance.now() - time);

time = performance.now();
pq.enqueue(500000);
console.log("ms to add 500000", performance.now() - time);

time = performance.now();
pq.enqueue(4000000);
console.log("ms to add 4000000", performance.now() - time);

time = performance.now();
pq.changePriority((a: number, b: number) => b - a);
console.log("ms to re-sort", performance.now() - time);