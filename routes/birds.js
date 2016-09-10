/**
 * Created by yangyang on 9/7/16.
 */
var express = require("express");
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'testuser',
    password: 'testuser',
    database: 'todo'
});

//<<<<<<<<<<<<<<<<<birds>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/birds", function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            tempCont.query("select * from birds", function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
})

router.post("/birds/new", function(req, res) {
    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var bird = req.body;
            console.log(bird);
            var query = tempCont.query("insert into birds  set ?", bird, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);

                }
            })
            console.log(query.sql);

        }
    })
})

//<<<<<<<<<<<<<<<<<records>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get("/birds/:id/records", function(req, res) {
    var id = req.params.id;

    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            tempCont.query("select * from records where id = ?", id, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
})

router.post("/birds/:id/records/new", function(req, res) {
    var id = req.params.id;

    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var record = req.body;
            record.time = new Date(record.time);
            console.log(record);

            var query = tempCont.query("insert into records set ?", record, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
            console.log(query.sql);
        }
    })
})

router.get("/birds/:id/records/:rid", function(req, res) {
    var rid = req.params.rid;
    console.log(rid);

    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            tempCont.query("select * from records where rid = ?", rid, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
})

router.put("/birds/:id/records/:rid", function(req, res) {
    var rid = req.params.rid;


    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var record = req.body;
            record.time = new Date(record.time);
            tempCont.query("update records set ? where rid=?", [record, rid], function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
})


router.delete("/birds/:id/records/:rid", function(req, res) {
    var rid = req.params.rid;

    connection.getConnection(function (err, tempCont) {
        if (err) {
            console.error(err);
            tempCont.release();
            res.send(err);
        } else {
            console.log("connected!");
            var record = req.body;
            record.time = new Date(record.time);
            tempCont.query("delete from records where rid=?", rid, function (err, rows, fields) {
                tempCont.release();
                if (err) {
                    console.error(err);
                    res.send(err);
                } else {
                    console.log(rows);
                    res.json(rows);
                }
            })
        }
    })
})

module.exports = router;