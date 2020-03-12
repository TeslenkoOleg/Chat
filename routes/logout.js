exports.post = function (req, res, next) {
  /*  let sid = req.session.id;
    let io = req.app.get('io');*/

    req.session.destroy();
    console.log('Sess is destroyed.');
    /*(function (err) {
        io.sockets._events.sessreload(sid);
        if (err) return next(err);*/
        res.send('You session is destroy')

};
