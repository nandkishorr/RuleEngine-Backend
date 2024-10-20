const RuleModel = require('../models/rule.model');
const {buildAST} = require('../utils/rule.utils');

const create_rule = async (req,res) => {
    try {
        const ast=buildAST(req.rule);
        const rule = new RuleModel({
            rule: req.rule,
            ast: ast
        });
        await rule.save();
        return rule;
    } catch (error) {
        res.status(500).json({
            message: 'Error creating rule',
            error: error.message
          });
    }
}
module.exports = {
    create_rule
}