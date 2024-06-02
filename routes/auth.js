//Gerekli paketler iceri aktarildi.
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//Kayit ol icin istek atma ve cevap islemleri yabildi.(endpoint)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    // const salt = await bcrypt.genSalt(10);
    const salt = process.env.Salt;
    try {
        const user = new User({ name, email, password });
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.log(salt);
        console.error(err.message);
        res.status(500).send('Server Hatasi');
    }
});

//Giris yabmak icin istek atma ve cevap islemleri yabildi.(endpoint)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const salt = process.env.Salt
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email hatali tekrar giriniz.' });
        }
        const hashedPass = await bcrypt.hash(password, salt);
        if (!hashedPass == user.password) {
            return res.status(400).json({ msg: 'Şifre Hatali tekrar giriniz.' })
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error('Server Hatasi', process.env.JWT_SECRET);
        res.status(500).send('Server Hatasi');
    }
})
//router disari aktarildi
module.exports = router;