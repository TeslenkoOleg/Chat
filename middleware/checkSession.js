module.exports = function (req, res, next) {
    if (!req.session.user) {
        console.log('sess end');
        res.redirect("/login");
    }
    next()
};
