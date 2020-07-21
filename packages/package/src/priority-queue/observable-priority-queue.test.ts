import { OPriorityQueue } from "./observable-priority-queue";
import { observe } from "mobx";

describe("Observable PriorityQueue Main Suite", () => {
    it("Initializes without error", () => {
        expect(typeof OPriorityQueue).toBe("function");

        expect(new OPriorityQueue<number>({
            priorityPredicate: () => 1
        })).toBeInstanceOf(OPriorityQueue);
        expect(() => new OPriorityQueue()).toThrow();
    });

    // mobx reactions throw inside tests ... 
    // TODO: investigate issue with mobx and jest.
    // it("Observable count", done => {
    //     const items = [2, 1, 4, 3];
    //     const q = new OPriorityQueue<number>({
    //         priorityPredicate: (a: number, b: number) => a - b
    //     });

    //     observe(q, "count", x => {
    //         expect(x.newValue).toEqual(4);
    //         done();
    //     })

    //     items.forEach(x => q.enqueue(x));
    //     expect(q.count).toEqual(4);
    // });

});
