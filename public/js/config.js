/**
 * Created by yangyang on 9/7/16.
 */
(function () {
    angular
        .module("birdapp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider.when("/", {
                templateUrl: "views/home.html"
            })
            .when("/birds", {
                templateUrl: "views/bird/bird-list.html",
                controller: "birdListController",
                controllerAs: "model"
            })
            .when("/birds/new", {
                templateUrl: "views/bird/bird-new.html",
                controller: "newBirdController",
                controllerAs: "model"
            })

            .when("/birds/:id/records", {
                templateUrl: "views/record/record-list.html",
                controller: "recordListController",
                controllerAs: "model"
            })
            .when("/birds/:id/records/new", {
                templateUrl: "views/record/record-new.html",
                controller: "newRecordController",
                controllerAs: "model"
            })
            .when("/birds/:id/records/:rid", {
                templateUrl: "views/record/record-edit.html",
                controller: "editRecordController",
                controllerAs: "model"
            })



    }
})();