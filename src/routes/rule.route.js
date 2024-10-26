const express = require('express');
const routes = express.Router();
const { createRuleData,combineRuleData,evaluateRuleData,getAllRuleData,updateRuleData,deleteRuleData } = require('../controllers/rule.controller.js');
routes.route('/rules').get(getAllRuleData);
routes.route('/create').post(createRuleData);
routes.route('/combine').post(combineRuleData);
routes.route('/evaluate').post(evaluateRuleData);
routes.route('/update').patch(updateRuleData);
routes.route('/delete').delete(deleteRuleData);

module.exports = routes;