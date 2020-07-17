import "./index.less";

export function init() { }

export * from "./priority-queue";
import { PriorityQueue } from "./priority-queue";
import { testData } from "./index.data";

var pq = new PriorityQueue<number>();

let time = performance.now();
testData.forEach(x => pq.enqueue(x));
console.log(`Added ${pq.count} elements to priority queue in ${performance.now() - time}`);

time = performance.now();
pq.enqueue(50000);
console.log("ms to add 50000", performance.now() - time);

time = performance.now();
pq.enqueue(1);
console.log("ms to add first element", performance.now() - time);

time = performance.now();
pq.enqueue(100001);
console.log("ms to add last element", performance.now() - time);

time = performance.now();
pq.changePriority((a: number, b: number) => b - a);
console.log("ms to re-sort", performance.now() - time);