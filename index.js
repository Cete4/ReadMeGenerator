

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Choices = require("inquirer/lib/objects/choices");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the project title?"
        },
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "description",
            message: "What is the discription of the project??"
        },
        {
            type: "input",
            name: "install",
            message: "What are the installation instructions?",
        },
        {
            type: "input",
            name: "usage",
            message: "What are the usage instructions?",
        },
        {
            type: "input",
            name: "contribution",
            message: "What are the contribution guidelinest?",
        },

        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email for contact form."
        },
        {
            type: "input",
            name: "linkedin",
            message: "Enter your LinkedIn URL."
        }
    ]);
}

function generateReadme(answers) {
    return `# ${answers.title} 
    \n **Created by ${answers.name}**
    \n ## Table of Contents
    \n ----
    \n [Description](#description)
    \n [Installation](#installation)
    \n [Usage](#usage)
    \n [Questions](#questions)
    \n ## Description
    \n ${answers.description}
    \n ## Installation Instructions
    \n ${answers.usage}
    \n ## Usage Guidelines
    \n ${answers.usage}
    \n ## Questions
    \n Email me at ${answers.email}`;
}

promptUser()
    .then(function (answers) {
        const html = generateReadme(answers);

        return writeFileAsync("README.md", generateReadme(answers));
    })
    .then(function () {
        console.log("Successfully wrote to ReadMe.md");
    })
    .catch(function (err) {
        console.log(err);
    });
