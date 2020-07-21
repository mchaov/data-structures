import { observable, action, IObservableArray, computed } from "mobx";
import { createTransformer } from "mobx-utils";
import { PriorityQueue, PriorityQueueOptions, defaultOptions } from "./priority-queue";

export class OPriorityQueue<T> extends PriorityQueue<T> {
    @observable protected data: IObservableArray<T>;
    @observable contains: (element: T) => boolean;
    @observable peek: () => T[];

    constructor(options: PriorityQueueOptions<T> = defaultOptions as any) {
        super(options);

        this.data = observable(options.initialData || []);
        this.sort();

        this.contains = createTransformer((element: T) => {
            return super.contains(element);
        });
        this.peek = super.peek;
    }

    @computed get count() { return super.count; }

    @action clear() { super.clear() }

    @action.bound dequeue() {
        return super.dequeue();
    }

    @action.bound enqueue(element: T) {
        super.enqueue(element);
    }

    @action.bound protected sort() {
        this.data.replace(this.data.slice().sort(this.priorityPredicate));
    }
}