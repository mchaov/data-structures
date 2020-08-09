export interface IStack<T> {
    pop(): T | undefined // it will throw, need to fix the type, can't be undefined
    peek(): T[]
    count: number
    clear(): void
    push(element: T): void
    contains(element: T): boolean
}

export class Stack<T> implements IStack<T> {
    private data: T[]
    private maxSize: number // 0 === autosize

    constructor(maxSize: number = 0) {
        this.maxSize = maxSize;
        this.data = new Array();
    }

    peek() { return this.data.slice() }
    get count() { return this.data.length }
    clear() { this.data = new Array() }
    contains(element: T) { return this.data.indexOf(element) > -1 }

    push(element: T) {
        if (this.maxSize !== 0 && this.count >= this.maxSize) {
            throw new Error("stack overflow");
        }
        this.data.push(element);
    }

    pop() {
        if (this.count <= 0) {
            throw new Error("stack underflow");
        }
        return this.data.pop();
    }
}
