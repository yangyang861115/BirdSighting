/**
 * Created by yangyang on 9/7/16.
 */

(function () {
    angular
        .module("birdapp")
        .controller("birdListController", birdListController)
        .controller("newBirdController", newBirdController)
        .controller("recordListController", recordListController)
        .controller("newRecordController", newRecordController)
        .controller("editRecordController", editRecordController);

    function birdListController(birdService) {
        var vm = this;

        function init() {
            birdService
                .findAllBirds()
                .then(
                    function (response) {
                        var birds = response.data;
                        if (birds) {
                            vm.birds = birds;
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

        init();
    }

    function newBirdController(birdService, $location) {
        var vm = this;
        vm.addNewBird = addNewBird;

        function addNewBird(bird) {
            console.log(bird);
            birdService
                .addNewBird(bird)
                .then(
                    function (response) {
                        if (response.data) {
                            $location.url("/birds");
                        }

                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

    }

    function recordListController(birdService, $routeParams) {
        var vm = this;
        var id = $routeParams.id;
        vm.id = id;
        console.log(id);

        vm.deleteRecord = deleteRecord;


        function init() {
            birdService
                .findAllRecordsBybid(id)
                .then(
                    function (response) {
                        var records = response.data;
                        if (records) {
                            vm.records = records;
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

        init();

        function deleteRecord(rid) {
            console.log(rid);
            birdService
                .deleteRecordById(rid)
                .then(
                    function (response) {
                        if (response.data) {
                            init();
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

    }

    function newRecordController(birdService, $location, $routeParams) {
        var vm = this;
        var id = $routeParams.id;

        vm.id = id;

        vm.addNewRecordForBird = addNewRecordForBird;

        function addNewRecordForBird(record) {
            record.id = id;
            console.log(record);
            birdService
                .addNewRecord(record)
                .then(
                    function (response) {
                        if (response.data) {
                            $location.url("/birds/" + id + "/records");
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

    }

    function editRecordController(birdService, $http, $routeParams, $location) {
        var vm = this;
        var id = $routeParams.id;
        var rid= $routeParams.rid;
        vm.id = id;

        vm.updateRecordForBird = updateRecordForBird;

        function init() {
            birdService
                .findRecordByRId(rid)
                .then(
                    function (response) {
                        var record = response.data[0];
                        if (record) {
                            record.time = new Date(record.time);
                            vm.record = record;
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }

        init();



        function updateRecordForBird(record) {
            console.log(record);
            birdService
                .updateRecord(record)
                .then(
                    function (response) {
                        if (response.data) {
                            $location.url("/birds/" + id + "/records");
                        }
                    },
                    function (error) {
                        vm.error = "something went wrong!";
                    }
                )
        }
    }

})();