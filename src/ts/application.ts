/// <reference path='_all.ts' />

module todos {
    'use strict';

    var todomvc = angular.module('todomvc',[])
        .service('todoStorage',TodoStorage)
        .controller('todoCtr',TodoCtrl)
}
