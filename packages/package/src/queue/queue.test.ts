import { Queue } from "./queue";

describe("Queue suite", () => {
    it("Queue initializes", () => {
        expect(typeof Queue).toBe("function");
        expect(new Queue()).toBeInstanceOf(Queue);
    })
})