///<reference path='_all.ts' />

module todos {

    'use strict';
    export class TodoCtrl {
        private todos: TodoItem[];

        public static $inject = [
            '$scope',
            '$location',
            'filterFilter'
        ];
        constructor(
            private $scope: ITodoScope,
            private $location: ng.ILocationService,
            private filterFilter
            ){
                this.todos = $scope.todos = [
                    {
                        title: 'test001',
                        completed: false
                    },
                    {
                        title: 'test002',
                        completed: true
                    }
                ];

                $scope.newTodo = '';
                $scope.editTodo = null;
                $scope.vm = this;

                $scope.$watch('todos',() => this.onTodos(),true);
                $scope.$watch(()=> $location.path(),path => this.onPath(path));
                if($location.path() === '') $location.path('/');
                $scope.location = $location;

        }
        onPath(path:string) {
            this.$scope.statusFilter = (path === '/active') ? {completed:false} : (path === 'completed')? {completed: true} : null;

        }
        onTodos() {
            this.$scope.remainingCount = this.filterFilter(this.todos,{completed: false}).length;
            this.$scope.allChecked = !this.$scope.remainingCount;
        }
        addTodo() {
            var newTodo:string = this.$scope.newTodo.trim();

            if(!newTodo){
                return;
            }
            this.todos.push({title:newTodo,completed:false});
            this.$scope.newTodo = '';
        }
        removeTodo(todo: TodoItem )  {
            this.todos.splice(this.todos.indexOf(todo),1);
        }
        editTodo(todo: TodoItem) {
            this.$scope.editTodo = todo;
        }
        doneEditTodo(todo:TodoItem){
            this.$scope.editTodo = null;
            todo.title = todo.title.trim();
            if(!todo.title){
                this.removeTodo(todo);
            }
        }
        checkAll(allChecked: boolean) {
            this.$scope.todos.forEach(todo =>{ 
                todo.completed = allChecked;
            });
        }
    }
}
