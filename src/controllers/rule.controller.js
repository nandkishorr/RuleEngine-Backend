const { get } = require('mongoose');
const {get_all_rules,create_rule,combine_rule,evaluate_rule} = require('../services/rule.service');


const getAllRuleData = async (req, res) => {
    try {
        const rule = await get_all_rules()
        res.status(200).json(rule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const createRuleData = async (req, res) => {
    try {
        //  console.log(req.body);
        const rule = await create_rule(req.body);
        console.log(rule);
        res.send(rule);
    } catch (error) {
        console.log(error);
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

const evaluateRuleData = async (req, res) => {
    try {
        const rule = await evaluate_rule(req.body);
        res.status(201).json(rule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createRuleData,
    combineRuleData,
    evaluateRuleData,
    getAllRuleData
    };