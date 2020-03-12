let User = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\model\\users.js').User;
const conf = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\conf\\conf.json');
const connect = require('connect');
const async = require('async');
const cookie = require('cookie');
const sessionStore = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\libs\\sessionStore.js');
const cookieParser = require('cookie-parser');
const log = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\libs\\log.js');
let data;
function loadSession(sid, callback){
    console.log('LoadSession ' + sid);
    sessionStore.load(sid, function (err, session) {
        if (arguments.length === 0) {
            return callback (null, null);
        } else {
            console.log("l S - "+session);
            return callback(null, session)
        }
    });

}
function loadUser(session, callback){
    console.log('Load user');
    if (!session.user){

        console.log('Session is anonymous');
        return callback(null, null)
    }

        User.findById(session.user, function (err, user) {
            if (err) return callback(err);
            if (!user){
                return callback(null, null);
            }
            console.log('User find' + user);
            callback(null, user)

        })

}
module.exports = function(server) {
    console.log('99');
    let io = require('socket.io')(server);
    io.set('origins', 'localhost:*');

    /*io.use(function(socket, next) {
        let handshakeData = socket.request;
        handshakeData.cookies = cookie.parse(handshakeData.headers.cookie || '');
        var sidCookie = handshakeData.cookies['sid'];
        var sid = cookieParser.signedCookie(sidCookie, 'This is a secret');
        if(!sid){
            log.error('Not session found');
        }
        redis.get('sess:'+sid, function(err, data) {
            if(err){
                log.error('io.authorization -> ',err);
                next(new Error('not authorized'));
            }
            if(data){
                socket.handshake.user = jsonParse(data);
                next();
            }
        });

    });*/

    io.set('authorization', function (handshake, callback) {
        data = handshake;
        async.waterfall([
            function (callback) {

                console.log('f 1');
                //console.log(handshake);
            data.cookies = cookie.parse(data.headers.cookie || '');
            let sidCookie = data.cookies['connect.sid'];
                //console.log('sid - '+sidCookie);
            //let sid = connect.utils.parseSignedCookie(sidCookie, "This is a secret"/*conf.get('session:secret')*/);
                let sid = cookieParser.signedCookie(sidCookie, 'This is a secret');
            //console.log('sid - '+sidCookie);
                console.log('sid - '+sid);
            loadSession(sid, callback);
                //console.log('66');
                console.log(callback);
            },
            function (session, callback) {
                    console.log('f 2');
                console.log(session);
                if (!session){
                    callback(new Error('Pomylka))'))
                }
                data.session = session;

                loadUser(session, callback);
            },
            function (user, callback) {
                console.log('f 3')
            if (!user){
                callback(new Error('23'))
            } else {
                data.user = user;
                //console.log('username -'+ data.user.username)
                //console.log(handshake)
                callback(null)}

            }
        ], function (err) {
            if (!err){
                return callback(null, true)
            }
            callback(err)
        });

    });

   /* io.on('sessreload', function (sid) {
        let clients = io.sockets.clients();
        console.log(clients)
        clients.forEach(function (client) {
            if (client.data.session.id !==sid) return;
            loadSession(sid, function (err, session) {
                if (err){
                    client.emit('error', 'server error');
                    client.disconnect();
                    return;
                }
                if (!session){
                    client.emit('error', 'handshake unauth');
                    client.disconnect();
                    return;
                }

                client.data.session = session;

            })

        })

    })*/

    io.sockets.on('connection', function (socket) {
        //let handshake = socket.handshake;
        console.log(data.user);
        let username = data.user.username;
        console.log('io '+ username);

        socket.broadcast.emit('join', username);

        socket.on('message', function (text, callback) {
            console.log('222');
            socket.broadcast.emit('message', username, text);
            callback()
        });
        socket.on('disconnect', function () {
            console.log('io discon');
            socket.broadcast.emit('leave', username)

        })
    });
    return io;
};
