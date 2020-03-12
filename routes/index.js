let checkSess = require ('C:\\Users\\tesle\\PhpstormProjects\\Chat\\middleware\\checkSession.js')
module.exports = function (app) {
app.get('/', require('./frontpage').get);
app.get('/login', require('./login').get);
app.post('/login', require('./login').post);
app.get('/chat', checkSess,require('./chat').get);
app.get('/register', require('./register').get);
app.post('/register', require('./register').post);
app.post('/logout', require('./logout').post);


}
