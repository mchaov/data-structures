import { LinkedList } from "./linked-list";

describe("LinkedList suite", () => {
    it("LinkedList initializes", () => {
        expect(typeof LinkedList).toBe("function");
        expect(new LinkedList()).toBeInstanceOf(LinkedList);
    })
})