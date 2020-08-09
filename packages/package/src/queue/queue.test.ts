import { Queue } from "./queue";

describe("Queue Main Suite", () => {
    it("Initializes without error", () => {
        const q = new Queue();
        expect(typeof Queue).toBe("function");
        expect(q.count).toBe(0);
        expect(q.peek()).toEqual([]);
        expect(q).toBeInstanceOf(Queue);
    });

    it("Enqueues", () => {
        const q = new Queue<number>();

        q.enqueue(1)

        expect(q.count).toBe(1);
        expect(q.peek()).toEqual([1]);
    });

    it("Dequeues", () => {
        const q = new Queue<number>();

        q.enqueue(1)

        expect(q.count).toBe(1);
        expect(q.peek()).toEqual([1]);
        expect(q.dequeue()).toBe(1);
        expect(q.count).toBe(0);
        expect(q.peek()).toEqual([]);
    });

    it("Clears", () => {
        const q = new Queue<number>();

        q.enqueue(1);

        expect(q.count).toBe(1);
        expect(q.peek()).toEqual([1]);

        q.clear();
        expect(q.count).toBe(0);
        expect(q.peek()).toEqual([]);
    });

    it("Contains", () => {
        const q = new Queue<number>();

        q.enqueue(1);

        expect(q.contains(1)).toBe(true);
        expect(q.contains(2)).toBe(false);
    });

    it("Overflows", () => {
        const q = new Queue<number>(1);

        q.enqueue(1);

        expect(() => { q.enqueue(2) }).toThrow();
    });

    it("Undeflows", () => {
        const q = new Queue<number>();

        q.enqueue(1);

        expect(q.dequeue()).toBe(1);
        expect(() => { q.dequeue() }).toThrow();
    });
});

describe("Saturation Suite", () => {
    it("FILO", () => {
        const q = new Queue<number>();

        q.enqueue(1);
        q.enqueue(2);

        expect(q.dequeue()).toBe(1);
        expect(q.dequeue()).toBe(2);
    });

    it("With strings", () => {
        const q = new Queue<string>();

        q.enqueue("a");
        q.enqueue("b");

        expect(q.peek()).toEqual(["a", "b"]);
        expect(q.dequeue()).toBe("a");
        expect(q.dequeue()).toBe("b");
        expect(q.count).toBe(0);
    });

    it("With objects", () => {
        type X = { foo: number }
        const q = new Queue<X>();

        const a = { foo: 1 }
        const b = { foo: 2 }

        q.enqueue(a);
        q.enqueue(b);

        expect(q.peek()).toEqual([a, b]);
        expect(q.dequeue()).toBe(a);
        expect(q.dequeue()).toBe(b);
        expect(q.count).toBe(0);
    });
})