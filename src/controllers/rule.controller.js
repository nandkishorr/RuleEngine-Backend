const {create_rule,combine_rule,evaluate_rule} = require('../services/rule.service');

const createRuleData = async (req, res) => {
    try {
        const rule = await create_rule(req.body);
        res.status(201).json(rule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const combineRuleData = async (req, res) => {
    try {
        const rule = await combine_rule(req.body);
        res.status(201).json(rule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createRuleData,
    combineRuleData,
    };