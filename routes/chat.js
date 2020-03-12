let User = require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\model\\users.js').User;
let chat ='';
exports.get = function (req, res) {
        res.render('chat', {
            user: req.user,
        })
};


/*exports.post = function (req, res, next) {
    let arr=[];
    console.log(req.body);
    for (let k in req.body){
        arr.push(k);
        console.log(arr);
    }

    let u = JSON.parse(arr[0]);
    let text = u.text;
    chat += ` <br /> <b><mark>${req.user.username}:</mark> </b>${text} `;
    res.send(chat)


};*/
