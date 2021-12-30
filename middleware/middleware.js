const jwt = require('jsonwebtoken');
const tokenSecret = 'im_app_token_secret'

exports.verify = (req,res,next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error:'token missing'})
    else {
        jwt.verify(token.split(' ')[1],tokenSecret,(err,value) => {
            if(err) res.status(500).json({error:'incorrect token'})
            req.user = value.data
            next()
        })
    }
}

