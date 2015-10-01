/// <reference path='_all.ts' />

module todos {
    export class TodoItem {
        constructor (
            public title: string,
            public completed: boolean
        ){}
    }
}