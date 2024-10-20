const RuleModel = require('../models/rule.model');
const {buildAST,evaluateRule} = require('../utils/rule.utils');

const create_rule = async (req,res) => {
    try {
        // console.log(typeofreq.rule);
        const ast=await buildAST(req.rule);
        if(!ast){
            throw new Error('Invalid Rule');
        }
        const ruleData = new RuleModel({rule: req.rule,ast: ast});
        console.log(ruleData);
        await ruleData.save();
        return ruleData;
    } catch (error) {
        console.error('Error occurred in create_rule:', error);
        throw new Error('Failed to create rule');
    }
}
 const combine_rule = async (req,res) => {
    try {
        const ast1=await buildAST(req.rule1);
        const ast2=await buildAST(req.rule2);
        const combinedRule = {
            type: req.type,
            left: ast1,
            right: ast2
        };
        console.log(combinedRule);
        if(!ast1 || !ast2){
            throw new Error('Invalid Rule');
        }
        const rule = new RuleModel({
            rule: req.rule,
            ast: combinedRule
        });
        await rule.save();
        return rule;
    } catch (error) {
        console.error('Error occurred in create_rule:', error);
        throw new Error('Failed to combine rule');
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
