const RuleModel = require('../models/rule.model');
const {parse} = require('json5');
const {evaluate} = require('mathjs');

const create_rule = async (data) => {
    try {
        const rule = new RuleModel(data);
        await rule.save();
        return rule;
    } catch (error) {
        throw new Error(error.message);
    }
}