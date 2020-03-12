let User = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\model\\users.js').User;
const async = require('async');
const session = require('express-session');
exports.get = function (req, res) {
    res.render('login')
};

exports.post = function (req, res, next) {
let arr =[];
   console.log(req.body);
    for (let k in req.body){
        arr.push(k)
    }
    let obj = arr[0].split(',');

    let u = JSON.parse(obj[0]);
    let p = JSON.parse(obj[1]);
    let username = u.username;
    let password = p.password;
    console.log(username);
    console.log(password);

    User.findOne({username: username}, function (err, user) {
        if(err) return next(err);
        if (user){
            if (user.checkPassword(password)){
                req.session.user = user._id;
                console.log(JSON.stringify(req.session.user));
                res.send('ok');

            } else {
                res.send('Incorrect password!');
                console.log('Incorrect password!')}
        } else {
            res.send('User not found!');
                console.log('User not found!')}

    })
};
