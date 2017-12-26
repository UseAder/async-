var async =require('async');
// console.log(async.series)
console.time('test');//运行开始计时
async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
    // console.log(results)
});
console.timeEnd('test')//运行结束时间

async.series({//串行无关联   运行时间相加
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});

async.parallel({//并行无关联  最大执行时间 200 根据时间执行输出
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // console.log(results)
    // results is now equal to: {one: 1, two: 2}
});

async.waterfall([
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null,arg1, arg2,'three');
    },
    function(arg1,arg2,arg3,callback) {
        // arg1 now equals 'three'
        callback(null, [arg1, arg2,arg3,'done']);
    }
], function (err, result) {
    // result now equals 'done'
    console.log(result)
});
