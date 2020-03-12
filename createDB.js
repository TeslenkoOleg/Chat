
let mongoose = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\libs\\mongoose.js');
let async = require('async');
mongoose.set('debug', true);
async.series([
    open,
    dropDB,
    requiredModels,
    createUsers,
    close
], function (err, results) {
        console.log(arguments);
        close()
});

function open (callback){
        mongoose.connection.on('open', callback)
        };
function dropDB (callback){
                let db = mongoose.connection.db;
                db.dropDatabase(callback)
        };
function requiredModels(callback) {
        require('./model/users').User;

        async.each(Object.keys(mongoose.models), function (modelName, callback) {
                mongoose.models[modelName].ensureIndexes(callback);
        }, callback)
}

function createUsers (callback) {
        let users = [
                {username: 'Vasya', password: '1234'},
                {username: 'olha', password: '567'},
                {username: 'oleh', password: '098567'}
        ];
        async.each(users, function (item, callback) {
                let user = new mongoose.models.User(item);
                user.save(callback)

        }, callback);
}
function close (callback){
        mongoose.disconnect(callback)
}

