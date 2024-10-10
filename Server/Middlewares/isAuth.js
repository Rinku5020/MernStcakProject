
const jwt = require("jsonwebtoken")
const isAuth = (req, res, next) => {
    const { AccessToken } = req.cookies
    jwt.verify(AccessToken, process.env.privateKey_AccesToken, function (err, decoded) {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        const user = decoded.userSingnInData
        req.user = user
    });

    next()
}

module.exports = isAuth