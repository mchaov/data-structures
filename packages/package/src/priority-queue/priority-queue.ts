export type PriorityQueueTypes = string | number | { [key: string]: any }

export type PriorityQueuePredicate<T> = (a: T, b: T) => number;

export type PriorityQueueOptions<T> = {
    maxSize: number
    initialData: T[]
    priorityPredicate: PriorityQueuePredicate<T>
}

export interface IPriorityQueue<T extends PriorityQueueTypes> {
    count: number

    peek(): T[]
    dequeue(): T | undefined // fix the type -> we are throwing on empty queue - no way to get undefined
    clear(): void
    enqueue(element: T): void
    contains(element: T): boolean
    changePriority(priorityPredicate: PriorityQueuePredicate<T>): void
}

export class PriorityQueue<T> implements IPriorityQueue<T> {
    private data: T[] = [];
    private maxSize: number = 0
    private priorityPredicate: PriorityQueuePredicate<T>

    constructor(options: Partial<PriorityQueueOptions<T>> = {}) {

        this.maxSize = typeof options.maxSize === "undefined" ?
            0 :
            options.maxSize;

        this.priorityPredicate = typeof options.priorityPredicate === "undefined" ?
            ((a, b) => a - b) as any : // refactor not to assume default is number but to throw on missing predicate
            options.priorityPredicate;

        if (options.initialData) {
            this.data = options.initialData;
            this.sort();
        }
    }

    get count() { return this.data.length; }
    peek() { return this.data.slice(); }
    clear() { this.data = new Array(); }
    contains(element: T) { return this.data.indexOf(element) > -1; }

    dequeue() {
        if (this.count < 1) { throw new Error("queue empty :)"); }

        return this.data.shift();
    }

    enqueue(element: T) {
        if (this.maxSize !== 0 && this.count > this.maxSize) { throw new Error("queue overflow :)"); }

        this.data.splice(this.getIndex(element), 0, element);
    }

    changePriority(priorityPredicate: PriorityQueuePredicate<T>) {
        this.priorityPredicate = priorityPredicate;
        this.sort();
    }

    private sort() {
        this.data.sort(this.priorityPredicate);
    }

    private getIndex(element: T) {
        // some early exits
        if (this.count === 0) { return 0; }
        if (this.priorityPredicate(element, this.data[0]) < 0) { return 0; }
        if (this.priorityPredicate(element, this.data[this.data.length - 1]) > 0) { return this.data.length; }

        let mid = 0;
        let left = 0;
        let right = this.count - 1;

        //poor man's binary search
        while (left <= right) {
            mid = Math.floor((left + right) / 2);
            if (this.priorityPredicate(this.data[mid], element) > 0) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return Math.max(left, right, mid);
    }
}