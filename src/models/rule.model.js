const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    rule_string:{
        type:String,
        required:true,
        unique:true
    },
    ast: {
        type: Object,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Rule = mongoose.model('rule', ruleSchemaSchema);
module.exports = Rule;