import { Stack } from "./stack";

describe("Stack Main Suite", () => {
    it("Initializes without error", () => {
        expect(typeof Stack).toBe("function");

        const s = new Stack();

        expect(s).toBeInstanceOf(Stack);
        expect(s.peek()).toEqual([]);
        expect(s.count).toBe(0);
    });

    it("Pushes", () => {
        const s = new Stack<number>();

        s.push(1)

        expect(s.peek()).toEqual([1]);
        expect(s.count).toBe(1);
    });

    it("Pops", () => {
        const s = new Stack<number>();

        s.push(1)

        expect(s.pop()).toBe(1);
        expect(s.count).toBe(0);
    });

    it("Overflows", () => {
        const s = new Stack<number>(2);

        s.push(1)
        s.push(2)

        expect(() => { s.push(3) }).toThrow();
    });

    it("Undeflows", () => {
        const s = new Stack<number>();

        s.push(1);

        expect(s.pop()).toBe(1);
        expect(() => { s.pop() }).toThrow();
    });

    it("Clears", () => {
        const s = new Stack<number>();

        s.push(1);

        expect(s.count).toBe(1);

        s.clear();

        expect(s.count).toBe(0);
    });

    it("Contains", () => {
        const s = new Stack<number>();

        s.push(1);

        expect(s.contains(1)).toBe(true);
        expect(s.contains(2)).toBe(false);
    });

})