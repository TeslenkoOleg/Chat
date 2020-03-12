let User = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\model\\users.js').User;
exports.get = function (req, res) {
    res.render('register')
}

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
        if (!user){
            let user = new User({username: username, password: password});
            user.save(function (err, callback) {
                console.log(callback);
                res.send('You profile was created successful!')
            })
        } else {
            let user = new User({username: username, password: password});
            user.save(function (err, callback) {
                console.log(callback);
                res.send('This username is already used!')
            })

        }

    })
};
