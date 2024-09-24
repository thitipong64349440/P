const passport = require('passport')
module.exports = function (req, res, next) {
    passport.authenticate('person', 'jwt', function (err, person) {
        if (err || !person) {
            res.status(403).send({
                error: 'you do not have access to this resource'
            })
        } else {
            req.person = person
            next()
        }
    })(req, res, next)
} 