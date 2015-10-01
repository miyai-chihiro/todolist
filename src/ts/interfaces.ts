///<reference path='_all.ts' />

module todos {
    export interface ITodoScope extends ng.IScope {
        todos: TodoItem[];
        newTodo: string;
        editTodo : TodoItem;
        remainingCount: number;
        doneCount: number;
        allChecked: boolean;
        statusFilter: { completed: boolean; };
        location: ng.ILocationService;
        vm: TodoCtrl;
    }

    export interface ITodoStorage {
        get (): TodoItem[];
        put(todos: TodoItem[]);
    }
}
