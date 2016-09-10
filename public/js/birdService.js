/**
 * Created by yangyang on 9/7/16.
 */
(function(){
    angular
        .module("birdapp")
        .factory("birdService", birdService);

    function birdService($http, $routeParams){
        var api = {
            findAllBirds: findAllBirds,
            addNewBird:addNewBird,
            findAllRecordsBybid: findAllRecordsBybid,
            findRecordByRId: findRecordByRId,
            addNewRecord: addNewRecord,
            updateRecord: updateRecord,
            deleteRecordById: deleteRecordById
        };

        return api;

        function findAllBirds(){
            return $http.get("/birds");
        }

        function addNewBird(bird){
            return $http.post("/birds/new", bird);
        }

        function findAllRecordsBybid(id){
            return $http.get("/birds/" + id + "/records");
        }

        function deleteRecordById(rid){
            var id = $routeParams.id;
            return $http.delete("/birds/" + id + "/records/" + rid)
        }

        function addNewRecord(record){
            var id = $routeParams.id;
            return $http.post("/birds/" + id + "/records/new", record)
        }

        function findRecordByRId(rid){
            var id = $routeParams.id;
            return $http.get("/birds/" + id + "/records/" + rid)
        }

        function updateRecord(record) {
            var id = $routeParams.id;
            var rid = record.rid;
            return $http.put("/birds/" + id + "/records/" + rid, record)
        }


    }
})();
