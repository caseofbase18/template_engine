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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//function creates manager info
function createManager() {
    // console.log("Build your team!")
    inquirer.prompt([
        { name: "name", message: "What is the manager's name?", type: "input" },
        { name: "email", message: "What is the manager's email?", type: "input" },
        { name: "id", message: "What is the manager's id number?", type: "input" },
        { name: "office_number", message: "What is the manager's office number?", type: "input" }

    ]).then(function (response) {
        console.log(response)

        let manager = new Manager(response.name, response.email, response.id, response.office_number)
        employeeArray.push(manager)
        addNewMember();
    })
}
createManager();

function createIntern() {
    // console.log("Build your team!")
    inquirer.prompt([
        { name: "name", message: "What is the intern's name?", type: "input" },
        { name: "email", message: "What is the intern's email?", type: "input" },
        { name: "id", message: "What is the intern's id number?", type: "input" },
        { name: "school", message: "What school does the intern attend?", type: "input" }

    ]).then(function (response) {
        console.log(response)

        let intern = new Intern(response.name, response.email, response.id, response.school)
        employeeArray.push(intern)
        addNewMember();
    })
}
// createIntern();

function createEngineer() {
    // console.log("Build your team!")
    inquirer.prompt([
        { name: "name", message: "What is the engineer's name?", type: "input" },
        { name: "email", message: "What is the engineer's email?", type: "input" },
        { name: "id", message: "What is the engineer's id number?", type: "input" },
        { name: "github", message: "What is the engineer's GitHub name?", type: "input" }

    ]).then(function (response) {
        console.log(response)

        let engineer = new Engineer(response.name, response.email, response.id, response.github)
        employeeArray.push(engineer)
        addNewMember();
    })
}
// createEngineer();

function addNewMember() {
    inquirer.prompt([
        { name: "add", message: "Do you want to add more people?", choices: noYes, type: "list" }

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


         // console.log(generateMarkdown(response))
//         fs.writeFile("test.md", generateMarkdown(response), function(error, data){
//             if (error) throw error 
//             console.log("Your file is created!")
//         })

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
