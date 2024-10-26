const { get } = require('mongoose');
const {get_all_rules,create_rule,combine_rule,evaluate_rule,update_rule,delete_rule} = require('../services/rule.service');


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
        // console.log(req.body);
        const rule = await evaluate_rule(req.body);
        res.status(200).json(rule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateRuleData = async (req, res) => {
    try {
        const rule = await update_rule(req.body);
        res.status(200).json(rule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteRuleData = async (req, res) => {
    try {
        await delete_rule(req, res);
    } catch (error) {
        console.error('Error in deleteRuleData:', error);
        res.status(500).json({ message: 'Failed to delete rule', error: error.message });
    }
};





module.exports = {
    createRuleData,
    combineRuleData,
    evaluateRuleData,
    getAllRuleData,
    updateRuleData,
    deleteRuleData
    };