import { PriorityQueue } from "./priority-queue";

describe("PriorityQueue Main Suite", () => {
    it("Initializes without error", () => {
        expect(typeof PriorityQueue).toBe("function");

        expect(new PriorityQueue<number>({
            priorityPredicate: () => 1
        })).toBeInstanceOf(PriorityQueue);
        expect(() => new PriorityQueue()).toThrow();
    });

    it("Enqueues items T:number ASC", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue<number>({
            priorityPredicate: (a: number, b: number) => a - b
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        expect(q.contains(2)).toBe(true);
        expect(q.contains(5)).toBe(false);
        expect(q.peek()).toEqual([1, 2, 3, 4]);
        expect(q.dequeue()).toBe(1);
        expect(q.count).toBe(3);
    });

    it("Accepts priority function T:number DESC", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue<number>({
            priorityPredicate: (a: number, b: number) => b - a
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        expect(q.contains(2)).toBe(true);
        expect(q.contains(5)).toBe(false);
        expect(q.peek()).toEqual([4, 3, 2, 1]);
        expect(q.dequeue()).toBe(4);
        expect(q.count).toBe(3);
    });

    it("Clear queue", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue<number>({
            priorityPredicate: (a: number, b: number) => a - b
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        q.clear();
        expect(q.count).toBe(0);
    });

    it("Dequeue on empty queue throws", () => {
        const q = new PriorityQueue<number>({
            priorityPredicate: (a: number, b: number) => a - b
        });

        expect(() => q.dequeue()).toThrow();
    });

    it("Enque on limited queue throws", () => {
        const q = new PriorityQueue<number>({
            maxSize: 1,
            priorityPredicate: (a: number, b: number) => a - b
        });

        q.enqueue(1);
        q.enqueue(2);

        expect(() => q.enqueue(3)).toThrow();
    });

    it("Change priority", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue<number>({
            priorityPredicate: (a: number, b: number) => a - b
        });

        items.forEach(x => q.enqueue(x));

        expect(q.peek()).toEqual([1, 2, 3, 4]);

        q.changePriority((a, b) => b - a);

        expect(q.peek()).toEqual([4, 3, 2, 1]);
    });

    it("Initial data set", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue<number>({
            initialData: items,
            priorityPredicate: (a: number, b: number) => a - b
        });

        expect(q.count).toBe(4);
        expect(q.contains(2)).toBe(true);
        expect(q.contains(5)).toBe(false);
        expect(q.peek()).toEqual([1, 2, 3, 4]);
        expect(q.dequeue()).toBe(1);
        expect(q.count).toBe(3);
    });
});

describe("PriorityQueue Saturation Suite", () => {
    it("Repeated values", () => {
        const items = ["a", "b", "b", "a"];
        const q = new PriorityQueue<string>({
            priorityPredicate: (a: string, b: string) => a.localeCompare(b)
        });

        items.forEach(x => q.enqueue(x));

        expect(q.peek()).toEqual(["a", "a", "b", "b"]);
    });

    it("Strings ASC", () => {
        const items = ["b", "a", "d", "c"];
        const q = new PriorityQueue<string>({
            priorityPredicate: (a: string, b: string) => a.localeCompare(b)
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        expect(q.contains("a")).toBe(true);
        expect(q.contains("e")).toBe(false);
        expect(q.peek()).toEqual(["a", "b", "c", "d"]);
        expect(q.dequeue()).toBe("a");
        expect(q.count).toBe(3);
    });

    it("Strings DESC", () => {
        const items = ["b", "a", "d", "c"];
        const q = new PriorityQueue<string>({
            priorityPredicate: (b: string, a: string) => a.localeCompare(b)
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        expect(q.contains("a")).toBe(true);
        expect(q.contains("e")).toBe(false);
        expect(q.peek()).toEqual(["d", "c", "b", "a"]);
        expect(q.dequeue()).toBe("d");
        expect(q.count).toBe(3);
    });

    it("Objects ASC { foo: number }", () => {
        type Foo = { foo: number };
        const items: Foo[] = [
            { foo: 2 },
            { foo: 1 },
            { foo: 4 },
            { foo: 3 }
        ];
        const q = new PriorityQueue<Foo>({
            priorityPredicate: (a: Foo, b: Foo) => a.foo - b.foo
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        expect(q.contains(items[0])).toBe(true);
        expect(q.contains({ foo: 5 })).toBe(false);
        expect(q.peek()).toEqual([
            { foo: 1 },
            { foo: 2 },
            { foo: 3 },
            { foo: 4 },
        ]);
        expect(q.dequeue()).toBe(items[1]);
        expect(q.count).toBe(3);
    });

    it("Objects DESC { foo: number }", () => {
        type Foo = { foo: number };
        const items: Foo[] = [
            { foo: 2 },
            { foo: 1 },
            { foo: 4 },
            { foo: 3 }
        ];
        const q = new PriorityQueue<Foo>({
            priorityPredicate: (b: Foo, a: Foo) => a.foo - b.foo
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toBe(4);
        expect(q.contains(items[0])).toBe(true);
        expect(q.contains({ foo: 5 })).toBe(false);
        expect(q.peek()).toEqual([
            { foo: 4 },
            { foo: 3 },
            { foo: 2 },
            { foo: 1 },
        ]);
        expect(q.dequeue()).toBe(items[2]);
        expect(q.count).toBe(3);
    });
});