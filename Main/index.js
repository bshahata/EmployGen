const inquirer = require("./node_modules/inquirer");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
//declaring the cards array
let cards = [];
//importing filesystem
const fs = require('fs');
const { inherits } = require("util");
//declaring the employee array
const employees = [];
//inquirerfunction
inquirer
    //calling the prompt method
    .prompt([
        {
            //asking our questions
            type: "input",
            message: "What is the team managers name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is the team managers employee ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is the team managers Email adress?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the team managers office number?",
            name: "officeNumber",
        },

    ])
    //getting the answers to the prompts and splitting them into variables to be used in the HTML file to be created
    .then((answers) => {
        let employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        //pushing our instance of manager into employees
        employees.push(employee);
        //returns to main menu
        mainMenu();
    });
    //main menu function, offering an engineer, intern, or quit option
function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "would you like to enter another employee?",
                choices: ["add engineer", "add intern", "No"],
                name: "options"
            },
        ]).then(answers => {
            if (answers.options === "add engineer") {
                addEngineer()
            } else if (answers.options === "add intern") {
                addIntern()
            } else {
                //quit option instigates the else statement, and starts the body(cards) function, which then leads unto makesite, taking in the joined html file 
                body(cards);
                makesite()
            }
        })
};
//asks the engineer questions
function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineers name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the engineers employee ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the engineers Email adress?",
                name: "email",
            },
        ]).then(answers => {
            //pushes the instance of engineer into cards then returns main menu
            let employee = new Engineer(answers.name, answers.id, answers.email)
            employees.push(employee);
            mainMenu();
        })
}
//asks the intern questions
function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the interns name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the interns employee ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the interns Email adress?",
                name: "email",
            }

        ]).then(answers => {
            //pushes the instance of intern into cards then returns main menu
            let employee = new Intern(answers.name, answers.id, answers.email)
            employees.push(employee);
            mainMenu();
        })
}
//writes the accumulated html info from body into the distribution folder
 function makesite(){
    fs.writeFile('./dist/index.html', body(employees), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

init();