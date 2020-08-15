const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const Employee = require("./lib/Employee.js");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArray = [];

function managerQuestions() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "managersName",
        message: "What is your manager's name?",
      },
      {
        type: "input",
        name: "managersId",
        message: "What is your manager's ID number?",
      },
      {
        type: "input",
        name: "managersEmail",
        message: "What is your manager's email address?",
      },
      {
        type: "input",
        name: "managersOfficePhone",
        message: "What is your manager's office phone number?",
      },
    ])
    .then(function (answers) {
      const manager = new Manager(
        answers.managersName,
        answers.managersId,
        answers.managersEmail,
        answers.managersOfficePhone
      );
      employeesArray.push(manager);
      addEmployee();
    });
}

function engineerQuestions() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "engineersName",
        message: "What is your engineer's name?",
      },
      {
        type: "input",
        name: "engineersId",
        message: "What is your engineer's ID number?",
      },
      {
        type: "input",
        name: "engineersEmail",
        message: "What is your engineer's email address?",
      },
      {
        type: "input",
        name: "engineersGitHub",
        message: "What is your engineer's GitHub username?",
      },
    ])
    .then(function (answers) {
      const engineer = new engineer(
        answers.engineersName,
        answers.engineersId,
        answers.engineersEmail,
        answers.engineersGitHub
      );
      employeesArray.push(engineer);
      addEmployee();
    });
}

function internQuestions() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "internsName",
        message: "What is your intern's name?",
      },
      {
        type: "input",
        name: "internsId",
        message: "What is your intern's ID number?",
      },
      {
        type: "input",
        name: "internsEmail",
        message: "What is your intern's email address?",
      },
      {
        type: "input",
        name: "internsSchool",
        message: "What is your intern's school?",
      },
    ])
    .then((answers) => {
      const intern = new intern(
        answers.internsName,
        answers.internsId,
        answers.internsEmail,
        answers.internsSchool
      );
      employeesArray.push(intern);
      addEmployee();
    });
}

async function addEmployee() {
  return await inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What position are you adding?",
        choices: ["Manager", "Engineer", "Intern", "None"],
      },
    ])
    .then(function (answers) {
      switch (answers.role) {
        case "Manager":
          managerQuestions();
          break;
        case "Engineer":
          engineerQuestions();
          break;
        case "Intern":
          internQuestions();
          break;
        default:
          buildTeam();
      }
    });
}
// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "memberChoice",
//         message: "Which type of team member would you like to add?",
//         choices: [
//           "Manager",
//           "Engineer",
//           "Intern",
//           "I don't want to add any more team members",
//         ],
//       },
//     ])
//     .then((userChoice) => {
//       switch (userChoice.memberChoice) {
//         case "Engineer":
//           addEngineer();
//           break;
//         case "Intern":
//           addIntern();
//           break;
//         default:
//           buildTeam();
//       }
//     });
// }

function buildTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(employeesArray), "utf-8");
}

addEmployee();
