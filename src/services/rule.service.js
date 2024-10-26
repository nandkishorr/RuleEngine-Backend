const RuleModel = require('../models/rule.model');
const {buildAST,evaluateRule} = require('../utils/rule.utils');


const get_all_rules = async (req,res) => {
    try {
        const rules = await RuleModel.find();
        return rules;
    } catch (error) {
        console.error('Error occurred in get_all_rules:', error);
        throw new Error('Failed to fetch rules');
}
}

const create_rule = async (req,res) => {
    try {
        // console.log(typeofreq.rule);
        const ast=await buildAST(req.rule);
        if(!ast){
            throw new Error('Invalid Rule');
        }
        const ruleData = new RuleModel({rule: req.rule,ast: ast});
       // console.log(ruleData);
        await ruleData.save();
        return ruleData;
    } catch (error) {
        console.error('Error occurred in create_rule:', error);
        throw new Error('Failed to create rule');
    }
}
 const combine_rule = async (req,res) => {
    try {
        const rule1=req.rule1_id;
        const rule2=req.rule2_id;
        const ruleData1=await RuleModel.findById(rule1);
        const ruleData2=await RuleModel.findById(rule2);
        const ast1=ruleData1.ast;
        const ast2=ruleData2.ast;
        const combinedRule = {
            type: req.type,
            left: ast1,
            right: ast2
        };
        //console.log(combinedRule);
        if(!ast1 || !ast2){
            throw new Error('Invalid Rule');
        }
        const rule = new RuleModel({
            rule: '('+ruleData1.rule +')'+ ' ' + req.type +' '+'(' + ruleData2.rule +')',
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
        // console.log(req);
        const rule = await RuleModel.findById(req.id);
        const ast=rule.ast;
        console.log(ast);
        const result = evaluateRule(ast, req.data);
        if (result) {
            return {
              status: 'success',
              message: 'Successfully evaluated. The data satisfies the condition.',
              result: true
            };
          } else {
            return {
              status: 'success',
              message: 'Successfully evaluated. The data does not satisfy the condition.',
              result: false
            };
          }
    } catch (error) {
        res.status(500).json({
            message: 'Error evaluating rule',
            error: error.message
          });
    }
 }
 const update_rule = async (req, res) => {
    try {
        const ruleId = req.id;
        const ruleData = req.rule;
        const rule = await RuleModel.findById(ruleId);
        if (!rule) {
            return res.status(404).json({ message: 'Rule not found.' });
        }
        const ast = await buildAST(ruleData);
        if (!ast) {
            return res.status(400).json({ message: 'Invalid Rule' });
        }
        rule.rule = ruleData;
        rule.ast = ast;
        await rule.save();
        return res.status(200).json({ message: 'Rule updated successfully.', rule });
    } catch (error) {
        console.error('Error occurred in update_rule:', error);
        return res.status(500).json({ message: 'Failed to update rule', error: error.message });
    }
};
const delete_rule = async (req, res) => {
    try {
        const ruleId = req.query.id;
        if (!ruleId) {
            return res.status(400).json({ message: 'Rule ID is required.' });
        }
        console.log('Deleting Rule ID:', ruleId);
        const rule = await RuleModel.findById(ruleId);
        if (!rule) {
            return res.status(404).json({ message: 'Rule not found.' });
        }
        await RuleModel.deleteOne({ _id: ruleId });
        return res.status(200).json({ message: 'Rule deleted successfully.' });
    } catch (error) {
        console.error('Error occurred in delete_rule:', error);
        return res.status(500).json({ message: 'Failed to delete rule', error: error.message });
    }
};

module.exports = {
    create_rule,
    combine_rule,
    evaluate_rule,
    get_all_rules,
    update_rule,
    delete_rule
}
