const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory');
const User = require('../model/user');
const middleware = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const tokenSecret = 'im_app_token_secret'

/*
get all
get by user
get by category
create
create multiple
update multiple
*/

router.get('/all',middleware.verify,(req,res) => {
    Inventory.find({email:req.user.email}).then(invs => {
        res.status(200).json(invs)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})
router.post('/insert',middleware.verify,(req,res) => {
    Inventory.findOne({sku:req.body.sku,user:req.user._id}).then(inv => {
        if(inv){
            res.status(500).json({error:'sku already exist'})
        }
        else{
            newInv = Inventory({
                inventoryName:req.body.inventoryName,
                sku:req.body.sku,description:
                req.body.description,
                quantity:req.body.quantity,
                keyword:req.body.keyword,
                category:req.body.category,
                user:req.user._id})
            newInv.save()
            .then(inv => {
                res.status(200).json({msg:'Create Success'})
            })
            .catch(error => {
                res.status(500).json(error)
            })
        } 
    })
    .catch(error => {
        res.status(500).json(error)
    })
})
router.post('/update',middleware.verify,(req,res) => {
    const filter = {_id:req.body._id}
    const update = {
        inventoryName:req.body.inventoryName,
        sku:req.body.sku,description:
        req.body.description,
        quantity:req.body.quantity,
        keyword:req.body.keyword,
        category:req.body.category,
    }
    Inventory.findOneAndUpdate(filter,update,{new:true}).then(inv => {
        if(!inv){
            res.status(500).json({error:'_id does not exist'})
        }
        else{
            res.status(200).json({msg:`${inv._id} udpate Success`})
        } 
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router