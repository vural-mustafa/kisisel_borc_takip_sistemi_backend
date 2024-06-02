//Gerekli paketler iceri  aktarildi.
const mongoose= require('mongoose');

//Veri tabani icin gerekli model olusturuldu.
const PaymetSchema = new mongoose.Schema({
    amount:{type:Number,required:true},
    date:{type:Date,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    debtID:{type:mongoose.Schema.Types.ObjectId,ref:'Debt',required:true},
});

module.exports = mongoose.model('Payment',PaymetSchema);