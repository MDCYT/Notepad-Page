module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {

            return next();

        }
        return res.redirect('/signin')
    },
    isLoggedInProhibited(req, res, next) {
        if (req.isAuthenticated()) {

            return res.redirect('/profile')

        }
        return next();
    }
}