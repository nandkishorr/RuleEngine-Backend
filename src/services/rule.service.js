const RuleModel = require('../models/rule.model');
const {buildAST,evaluateRule} = require('../utils/rule.utils');

const create_rule = async (req,res) => {
    try {
        const ast=buildAST(req.rule);
        const rule = new RuleModel({
            rule: req.rule,
            ast: ast
        });
        console.log(rule);
        await rule.save();
        return rule;
    } catch (error) {
        res.status(500).json({
            message: 'Error creating rule',
            error: error.message
          });
    }
}
 const combine_rule = async (req,res) => {
    try {
        const ast1=buildAST(req.rule1);
        const ast2=buildAST(req.rule2);
        const combinedRule = {
            type: req.type,
            left: ast1,
            right: ast2
        };
        console.log(combinedRule);
        const rule = new RuleModel({
            rule: req.rule,
            ast: combinedRule
        });
        await rule.save();
        return rule;
    } catch (error) {
        res.status(500).json({
            message: 'Error combining rules',
            error: error.message
          });
    }
 }
 const evaluate_rule = async (req,res) => {
    try {
        const rule = await RuleModel.findOne(req.id);
        const ast=rule.ast;
        console.log(ast);
        const result = evaluateRule(ast, req.data);
        return result;
    } catch (error) {
        res.status(500).json({
            message: 'Error evaluating rule',
            error: error.message
          });
    }
 }
module.exports = {
    create_rule,
    combine_rule,
    evaluate_rule
}
