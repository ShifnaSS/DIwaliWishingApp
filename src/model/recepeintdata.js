const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.hypiv.mongodb.net/Deewali?retryWrites=true&w=majority');
const schema = mongoose.Schema;
//mongoose.set('debug', true);
const Rschema = new schema({
    rname : String,
    email_id  : String
});

var RecepeintData = mongoose.model('RecepeintData',Rschema);
module.exports = RecepeintData;