const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user');
const middleware = require('../middleware/middleware')
const round = 10

const jwt = require('jsonwebtoken');
const tokenSecret = 'im_app_token_secret'

router.post('/login',(req,res) => {
    User.findOne({email:req.body.email})//check if user exist
    .then(user => {
        if(!user) res.status(404).json({error:"can't find user with that email"})
        else {
            bcrypt.compare(req.body.password, user.password, (error,match) => {
                if (error) res.status(500).json(error)
                else if (match) {
                    const filter = { _id:user._id }
                    const update = {
                        login: true
                    }
                    User.findOneAndUpdate(filter,update,{new:true}).then(u => {
                        res.status(200).json({token:generateToken(user)})
                    })
                }
                else res.status(403).json({error:'passwords do not match'})
            })
        }    
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.get('/logout',middleware.verify, (req,res) => {
    User.findOne({_id:req.user._id,login:true}).then(user => {
        if(user){
            console.log(user)
            user.login = false
            user.save().then(re => res.status(200).json({msg:'logout success',data:user})).catch(error => res.status(500).json({msg:`${error}`}))
        }
        else{
            res.json(500).json({msg:'unable to find user'})
        }
    })
})

router.post('/register',(req,res) => {
    bcrypt.hash(req.body.password,round,(error,hash) => {
        if(error) res.status(500).json(error)
        else{
            const newUser = User({email:req.body.email,password:hash})
            newUser.save()
            .then(user => {
                res.status(200).json({token:generateToken(user),msg:'Register Success'})
            })
            .catch(error => {
                res.status(500).json(error)
            })
        }
    })
});

router.get('/jwtest',middleware.verify, (req,res) => {
    res.status(200).json(req.user)
})

const generateToken = (user) => {
    return jwt.sign({data:user},tokenSecret,{expiresIn:'24h'})
}

module.exports = router