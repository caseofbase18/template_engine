const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

const noYes = ["yes", "no"];

const empType = ["Intern", "Manager", "Engineer"];

//function creates manager info
function createManager() {
    console.log("Build your team!")
    inquirer.prompt([
        { name: "name", message: "What is the manager's name?", type: "input" },
        { name: "id", message: "What is the manager's id number?", type: "input" },
        { name: "email", message: "What is the manager's email?", type: "input" },
        { name: "office_number", message: "What is the manager's office number?", type: "input" }

    ]).then(function (response) {
        console.log(response)

        let manager = new Manager(response.name, response.email, response.id, response.office_number)
        employeeArray.push(manager)
        addNewMember();
    })
}
createManager();

//function creates intern info
function createIntern() {
    // console.log("Build your team!")
    inquirer.prompt([
        { name: "name", message: "What is the intern's name?", type: "input" },
        { name: "id", message: "What is the intern's id number?", type: "input" },
        { name: "email", message: "What is the intern's email?", type: "input" },
        { name: "school", message: "What school does the intern attend?", type: "input" }

    ]).then(function (response) {
        console.log(response)

        let intern = new Intern(response.name, response.email, response.id, response.school)
        employeeArray.push(intern)
        addNewMember();
    })
}
// createIntern();

//function creates engineer info
function createEngineer() {
    // console.log("Build your team!")
    inquirer.prompt([
        { name: "name", message: "What is the engineer's name?", type: "input" },
        { name: "id", message: "What is the engineer's id number?", type: "input" },
        { name: "email", message: "What is the engineer's email?", type: "input" },
        { name: "github", message: "What is the engineer's GitHub name?", type: "input" }

    ]).then(function (response) {
        console.log(response)

        let engineer = new Engineer(response.name, response.email, response.id, response.github)
        employeeArray.push(engineer)
        addNewMember();
    })
}
// createEngineer();

//function asks if user wants to add more employees
function addNewMember() {
    inquirer.prompt([
        { name: "add", message: "Do you want to add more employees?", choices: noYes, type: "list" }

    ]).then(function (response) {
        console.log(response)
        if (response.add == "yes") {
            employeeType();
        } else {
            if (!fs.existsSync(OUTPUT_DIR)){
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFile(outputPath, render(employeeArray), function (error, data) {
                if (error) throw error
                console.log("Your file is created!")
            })
        }
    })
}
// addNewMember();

//function asks what type of employee to add if yes in addNewMember()
function employeeType() {
    inquirer.prompt([
        { name: "employee_type", message: "What type of employee?", choices: empType, type: "list" }

    ]).then(function (response) {
        console.log(response)

        switch (response.employee_type) {
            case "Intern":
                createIntern();
                break;
            case "Manager":
                createManager();
                break;
            case "Engineer":
                createEngineer();
                break;
            default:
                return
        }
    })
}
