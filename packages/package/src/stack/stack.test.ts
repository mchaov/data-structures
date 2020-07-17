import { Stack } from "./stack";

describe("Stack suite", () => {
    it("Stack initializes", () => {
        expect(typeof Stack).toBe("function");
        expect(new Stack()).toBeInstanceOf(Stack);
    })
})