const User = require('./../../model/user')

module.exports = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => {
            return res.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
            return
        })
}