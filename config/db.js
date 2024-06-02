//Mongodb baglantisi icin gerekli paketler ice aktarildi.
const { error } = require('console');
const mongoose = require('mongoose');

//MongoDB baglantisi
const connect =async ()=>{
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined");
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connect;