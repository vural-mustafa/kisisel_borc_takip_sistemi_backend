//Gerekli ice aktarildi.
const mongoose = require('mongoose');

//Veri tabani icin gerekli model olusturuldu.
const DebtSchema=new mongoose.Schema({
    amount:{type:Number,required:true},
    description:{type:String,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
});

module.exports = mongoose.model('Debts',DebtSchema);