//Gerekli paketler iceri aktarildi
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
//Get istegi gerceklestirildi
router.get('/:debtId',async (req,res)=>{
    try {
        const payments = await Payment.find({debtID:req.params.userId});
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Hatasi');
    }
});

module.exports = router;