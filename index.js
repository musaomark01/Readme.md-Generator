const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the project title?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description for your project?',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Explain how to run your app?',
    },
    {
      type: 'input',
      name: 'video',
      message: 'Enter a link to a video explaining how to run your app?',
    },
    {
        type: 'rawlist',
  name: 'license',
  message: 'What type of license are you using for this project?',
  choices: [
    'MIT License',
    'GNU General Public License 3.0',
    'Apache License 2.0',
    'BSD 2-Clause License',
    'BSD 3-Clause License',
    'GNU Lesser General Public License 3.0',
    'Mozilla Public License 2.0',
    'ISC License',
    'The Unlicense',
    'Eclipse Public License 2.0',
    'GNU Affero General Public License 3.0',
    'GNU General Public License 2.0',
    'Mozilla Public License 1.1',
    'GNU Lesser General Public License 2.1',
        ],
      },
    {
      type: 'input',
      name: 'demo',
      message: 'Enter a link to a demo?',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address?',
    },
    {
      type: 'input',
      name: 'instructions',
      message: 'Enter special on how to reach you instructions?',
    },
  ])
  .then((data) => {
    const {
      title, description, installation, usage, video, demo, license, github, email, instructions,
    } = data;

    const readmeMdContent = `
# ${title}

## Description
${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Test](#test)
- [Questions](#questions)

## Installation
${installation}

## Usage
${usage}
[How to use video](${video})

## License
This project is licensed under the ${license} license.

## Contributing

## Test
Deployed Application: [Demo](${demo})

## Questions
- GitHub: [${github}](https://github.com/${github})
- Email: ${email}
- Instructions: ${instructions}
`;

    fs.writeFile('readme.md', readmeMdContent, (err) => {
      if (err) {
        console.error('Error writing readme.md file:', err);
      } else {
        console.log('readme.md file created successfully!');
      }
    });
  });