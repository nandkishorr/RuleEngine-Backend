const Rule = require('../models/ruleModel'); 
// Tokenize the rule string
function tokenize(ruleString) {
  // console.log("Raw rule string:", ruleString);  

 
  const regex = /\(|\)|AND|OR|>=|<=|!=|>|<|=|[^\s()]+/g;
  const tokens = ruleString.match(regex);
  // console.log("Tokenized result:", tokens);  
  
  return tokens;
}
function buildAST(ruleString) {
  // console.log("Raw rule string:", ruleString);
    const tokens = tokenize(ruleString);
    //  console.log("Tokenized rule:", tokens); 
  
   
    const parseCondition = (tokens) => {
      if (tokens.length === 3) {
        
        const [field, operator, value] = tokens;
        // console.log(`Parsed condition: ${field} ${operator} ${value}`); 
        return {
          type: 'condition',
          field: field.trim(),
          operator: operator.trim(),
          value: isNaN(value) ? value.replace(/['"]+/g, '') : Number(value.trim())
        };
      }
      throw new Error(`Invalid condition format: ${tokens.join(' ')}`);
    };
  
   
    const parseExpression = (tokens) => {
    //   console.log("Parsing expression:", tokens);  
  
      if (tokens.length === 1) {
       
        // console.log("Single token found, parsing as condition:", tokens[0]);
        return parseCondition([tokens[0]]);  
      }
  
      let depth = 0;
      let operatorIndex = -1;
  
     
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '(') {
          depth++;
        } else if (tokens[i] === ')') {
          depth--;
        } else if (depth === 0 && (tokens[i] === 'OR' || tokens[i] === 'AND')) {
          operatorIndex = i;
        //   console.log(`Operator ${tokens[i]} found at index ${i}`);
          break;
        }
      }
  
    
      if (operatorIndex !== -1) {
        // console.log(`Splitting expression at operator ${tokens[operatorIndex]}`);
        return {
          type: tokens[operatorIndex],  
          left: parseExpression(tokens.slice(0, operatorIndex)),
          right: parseExpression(tokens.slice(operatorIndex + 1))
        };
      }
  
      
      if (tokens[0] === '(' && tokens[tokens.length - 1] === ')') {
        // console.log("Parentheses detected, removing and parsing inner expression");
        return parseExpression(tokens.slice(1, -1));
      }
  
      
      if (tokens.length === 3 && !['AND', 'OR'].includes(tokens[1])) {
        return parseCondition(tokens);  
      }
  
      throw new Error(`Invalid expression: ${tokens.join(' ')}`);
    };
  
    return parseExpression(tokens);
}
//   const ruleString = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
//   try {
//     const ast = buildAST(ruleString);
//      console.log("Generated AST:", JSON.stringify(ast, null, 2));
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
  

///////////////////////////////////////////

function evaluateRule(ast, data) {
  if (ast.type === 'condition') {
    
    const { field, operator, value } = ast;
    const dataValue = data[field];

    switch (operator) {
      case '>':
        return dataValue > value;
      case '<':
        return dataValue < value;
      case '=':
        return dataValue === value;
      case '>=':
        return dataValue >= value;
      case '<=':
        return dataValue <= value;
      case '!=':
        return dataValue !== value;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  } else if (ast.type === 'AND') {
        return evaluateAST(ast.left, data) && evaluateAST(ast.right, data);
  } else if (ast.type === 'OR') {
    return evaluateAST(ast.left, data) || evaluateAST(ast.right, data);
  } else {
    throw new Error(`Unknown AST node type: ${ast.type}`);
  }
}

module.exports = {
    buildAST,
    evaluateRule
  }