//Gerekşi paketler ice aktarildi.
const express =require('express');
const router = express.Router();
const Debt = require('../models/Debt');
//Get ve post islemleri yabildi.


router.post('/',async (req,res)=>{
    const {amount,description}= req.body;
    console.log(req.user.id);
    try {
        const newDebt = new Debt({amount,description,userID:req.user.id});
        const debt = await newDebt.save();
        res.json(debt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Hatasi');
    }
});

router.get('/',async (req,res)=>{
    try {
        const debts = await Debt.find({userID:req.user.id});
        res.json(debts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatasi');
    }
});

router.get('/:userId',async (req,res)=>{
    try {
        const debts = await Debt.find({userID:req.user.id});
        res.json(debts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatasi');
    }
});

module.exports = router;