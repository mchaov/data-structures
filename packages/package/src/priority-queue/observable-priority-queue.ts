import { observable, action, IObservableArray, computed } from "mobx";
import { createTransformer } from "mobx-utils";
import { PriorityQueue, PriorityQueueOptions, defaultOptions } from "./priority-queue";

// file igonered from test coverage
// mobx reactions throw error inside tests ...
// TODO: investigate issue with mobx and jest.
/* istanbul ignore file */

export class OPriorityQueue<T> extends PriorityQueue<T> {
    @observable protected data: IObservableArray<T>;
    @observable contains: (element: T) => boolean;
    @observable peek: () => T[];

    constructor(options: PriorityQueueOptions<T> = defaultOptions as any) {
        super(options);

        this.data = observable.array(options.initialData || []);

        this.contains = createTransformer((element: T) => {
            return super.contains(element);
        });
        this.peek = super.peek;
    }

    @computed get count(): number {
        return super.count
    }

    clear = action(super.clear.bind(this))

    dequeue = action(super.dequeue.bind(this))

    enqueue = action(super.enqueue.bind(this))

    @action.bound sort() {
        this.data.sort(this.priorityPredicate);
    }

    changePriority = action(super.changePriority.bind(this))
}