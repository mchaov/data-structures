import { PriorityQueue } from "./priority-queue";

describe("PriorityQueue Main Suite", () => {
    it("Initializes without error", () => {
        expect(typeof PriorityQueue).toBe("function");
        expect(new PriorityQueue()).toBeInstanceOf(PriorityQueue);
    });

    it("Enqueues items T:number ASC", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue();

        items.forEach(x => q.enqueue(x));

        expect(q.count).toEqual(4);
        expect(q.contains(2)).toEqual(true);
        expect(q.contains(5)).toEqual(false);
        expect(q.peek()).toEqual([1, 2, 3, 4]);
        expect(q.dequeue()).toEqual(1);
        expect(q.count).toEqual(3);
    });

    it("Accepts priority function T:number DESC", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue<number>({
            priorityPredicate: (a: number, b: number) => b - a
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toEqual(4);
        expect(q.contains(2)).toEqual(true);
        expect(q.contains(5)).toEqual(false);
        expect(q.peek()).toEqual([4, 3, 2, 1]);
        expect(q.dequeue()).toEqual(4);
        expect(q.count).toEqual(3);
    });

    it("Clear queue", () => {
        const items = [2, 1, 4, 3];
        const q = new PriorityQueue();

        items.forEach(x => q.enqueue(x));

        expect(q.count).toEqual(4);
        q.clear();
        expect(q.count).toEqual(0);
    });

    it("Dequeue on empty queue throws", () => {
        const q = new PriorityQueue();

        expect(() => q.dequeue()).toThrow();
    });

    it("Enque on limited queue throws", () => {
        const q = new PriorityQueue({ maxSize: 1 });

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
            initialData: items
        });

        expect(q.count).toEqual(4);
        expect(q.contains(2)).toEqual(true);
        expect(q.contains(5)).toEqual(false);
        expect(q.peek()).toEqual([1, 2, 3, 4]);
        expect(q.dequeue()).toEqual(1);
        expect(q.count).toEqual(3);
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

        expect(q.count).toEqual(4);
        expect(q.contains("a")).toEqual(true);
        expect(q.contains("e")).toEqual(false);
        expect(q.peek()).toEqual(["a", "b", "c", "d"]);
        expect(q.dequeue()).toEqual("a");
        expect(q.count).toEqual(3);
    });

    it("Strings DESC", () => {
        const items = ["b", "a", "d", "c"];
        const q = new PriorityQueue<string>({
            priorityPredicate: (b: string, a: string) => a.localeCompare(b)
        });

        items.forEach(x => q.enqueue(x));

        expect(q.count).toEqual(4);
        expect(q.contains("a")).toEqual(true);
        expect(q.contains("e")).toEqual(false);
        expect(q.peek()).toEqual(["d", "c", "b", "a"]);
        expect(q.dequeue()).toEqual("d");
        expect(q.count).toEqual(3);
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

        expect(q.count).toEqual(4);
        expect(q.contains(items[0])).toEqual(true);
        expect(q.contains({ foo: 5 })).toEqual(false);
        expect(q.peek()).toEqual([
            { foo: 1 },
            { foo: 2 },
            { foo: 3 },
            { foo: 4 },
        ]);
        expect(q.dequeue()).toEqual(items[1]);
        expect(q.count).toEqual(3);
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

        expect(q.count).toEqual(4);
        expect(q.contains(items[0])).toEqual(true);
        expect(q.contains({ foo: 5 })).toEqual(false);
        expect(q.peek()).toEqual([
            { foo: 4 },
            { foo: 3 },
            { foo: 2 },
            { foo: 1 },
        ]);
        expect(q.dequeue()).toEqual(items[2]);
        expect(q.count).toEqual(3);
    });
});