export interface IQueue<T> {
    peek(): T[]
    dequeue(): T | undefined // fix the type -> we are throwing on empty queue - no way to get undefined
    count: number
    clear(): void
    enqueue(element: T): void
    contains(element: T): boolean
}

export class Queue<T> implements IQueue<T> {
    private data: T[]
    private maxSize: number // 0 => autosize

    constructor(maxSize = 0) {
        this.maxSize = maxSize;
        this.data = new Array();
    }

    clear() { this.data = new Array() }
    get count() { return this.data.length }
    contains(element: T) { return this.data.indexOf(element) > -1 }
    peek() { return this.data.slice() }

    enqueue(element: T) {
        if (this.maxSize !== 0 && this.count >= this.maxSize) {
            throw new Error("queue overflow");
        }
        this.data.push(element);
    }

    dequeue() {
        if (this.count <= 0) {
            throw new Error("queue underflow");
        }
        return this.data.shift();
    }
}
