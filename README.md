# Rule Enginew with AST
## Application Overview
The Rule Engine Backend is designed to evaluate user eligibility based on customizable rules defined by various attributes such as age, department, income, and experience. This application utilizes an Abstract Syntax Tree (AST) to represent rules, allowing for dynamic creation, modification, and evaluation of these rules.

## Objectives
- To provide a robust backend service for rule management and evaluation.
- To enable users to create and modify complex eligibility rules using a simple string format.
- To utilize efficient data structures (AST) for rule representation and evaluation.
- To ensure reliable and well-tested APIs for seamless data interaction and management.

## Repository
- GitHub Repository of Frontend RuleEngine : [RuleEngine-Frontend]([https://github.com/yourusername/your-repository](https://github.com/nandkishorr/RuleEngine-Frontend.git))

## Features
- **Dynamic Rule Creation**: 
  - Allows users to create rules from string representations, which are then converted into Abstract Syntax Trees (ASTs) for further processing.

- **Rule Combination**: 
  - Supports combining multiple rules into a single AST for optimized evaluation, enabling complex rule scenarios.

- **Rule Evaluation**: 
  - Evaluates user data against the defined rules to determine eligibility or compliance based on specified criteria.

- **Error Handling**: 
  - Implements robust error handling for invalid rule strings and input data, providing clear feedback to users for correction.

- **User-Defined Functions (Bonus)**: 
  - Potentially allows users to define custom functions within rules for advanced conditions, enhancing the flexibility of rule definitions.

- **Rule Updating**: 
  - Allows users to modify existing rules, enabling them to refine and adjust their conditions without needing to recreate them from scratch.

- **Rule Deletion**: 
  - Provides functionality for users to delete rules that are no longer needed, helping maintain a clean and relevant rule set.

- **Comprehensive API Testing**: 
  - Ensures all API endpoints are functional and provide accurate responses through automated and manual testing strategies.

- **Docker Containerization**: 
  - Facilitates consistent development and deployment environments by using Docker containers, ensuring the application runs smoothly across different setups.


## Technologies Used
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB
- **Containerization**: 
  - Docker
- **API Testing**: 
  - Postman

## Endpoints and Their Purpose
| Endpoint               | Method   | Purpose                                            |
|-----------------------|----------|----------------------------------------------------|
| `/create`    | POST     | Create a new rule from a string and store its AST representation. |
| `combine`  | POST     | Combine multiple rules into a single AST.         |
| `evaluate`  | POST     | Evaluate user data against the specified rule AST.|
| `/rules`          | GET      | Retrieve all stored rules and their details.      |
| `/rules/:id`          | PATCH     | Update a particular rule and its details.      |
| `/rules/:id`          | DELETE      | Delete a particular rule and its details.      |

## File Structure
The project follows a Model-View-Controller (MVC) architecture:
```
/src                               # Backend application
├── /config                        # Configuration files
│   ├── connection.js              # Database connection setup (MongoDB)
├── /controllers                   # API controllers (business logic for endpoints)
│   ├── rule.controller.js         # Logic for rule management and evaluation
├── /models                        # Database models (MongoDB schemas)
│   ├── rule.model.js              # Rule schema
├── /routes                        # API routes
│   ├── rule.route.js              # Routes for rule management endpoints
├── index.js                       # Main Express app setup
└── package.json                   # Backend dependencies and scripts
```
#Sample Structure of Rule: 
```
Rule String : ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5 OR salary < 50000)
{
    "rule": "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5 OR salary < 50000)",
    "ast": {
        "type": "AND",
        "left": {
            "type": "AND",
            "left": {
                "type": "condition",
                "field": "age",
                "operator": ">",
                "value": 30
            },
            "right": {
                "type": "condition",
                "field": "department",
                "operator": "=",
                "value": "Marketing"
            }
        },
        "right": {
            "type": "OR",
            "left": {
                "type": "condition",
                "field": "salary",
                "operator": ">",
                "value": 20000
            },
            "right": {
                "type": "OR",
                "left": {
                    "type": "condition",
                    "field": "experience",
                    "operator": ">",
                    "value": 5
                },
                "right": {
                    "type": "condition",
                    "field": "salary",
                    "operator": "<",
                    "value": 50000
                }
            }
        }
    },
    "_id": "671d76ba045028505af4af97",
    "__v": 0
}

```
## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (optional, if using Docker)

## Getting Started

### 1. Clone the Repository
To begin, clone the repository to your local machine:
```bash
git clone <repository_url>
cd ruleEngine-Backend

# With npm
npm install

# .env configuration
PORT=3000
MONGODB_URL="your_mongo_atlas_connection_string"
# Start the application
npm run start


```
