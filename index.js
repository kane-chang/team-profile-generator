const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = []

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the Team Manager\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the Team Manager\'s id?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the Team Manager\'s email?'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the Team Manager\'s office number'
    },
    {
        type: 'list',
        name: 'addMember',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add anymore members']
    }
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the engineer\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the engineer\'s id?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the engineer\'s email?'
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is the engineer\'s GitHub username'
    },
    {
        type: 'list',
        name: 'addMember',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add anymore members']
    }
];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the intern\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the intern\'s id?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the intern\'s email?'
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the intern\'s school'
    },
    {
        type: 'list',
        name: 'addMember',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add anymore members']
    }
]

const init = async () => {
    let response = await inquirer.prompt(managerQuestions)
    const teamManager = new Manager(response.name, response.id, response.email, response.officeNumber)
    team.push(teamManager)

    while (response.addMember != "I don't want to add anymore members") {
        if (response.addMember == "Engineer") {
            response = await inquirer.prompt(engineerQuestions)
            const newEngineer = new Engineer(response.name, response.id, response.email, response.github)
            team.push(newEngineer)
        } else if (response.addMember == "Intern") {
            response = await inquirer.prompt(internQuestions)
            const newIntern = new Intern(response.name, response.id, response.email, response.school)
            team.push(newIntern)
        }
    }

    console.log("this is the team so far: ", team);
    fs.writeFile(`team.html`, render(team), (err) =>
    err ? console.error(err) : console.log('HTML file generated!'));
}

init()
