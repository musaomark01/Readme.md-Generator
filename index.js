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
      type: 'confirm',
      name: 'includeTableOfContents',
      message: 'Do you want to add a table of contents?',
      default: true,
    },
    {
      type: 'checkbox',
      name: 'tableOfContentsSections',
      message: 'Select the sections you want to include in the table of contents:',
      choices: [
        'Installation', 'Usage', 'License', 'Contributing', 'Test','Questions',
      ],
      when: (answers) => answers.includeTableOfContents,
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
      name: 'contributing',
      message: '',
    },
    {
      type: 'rawlist',
      name: 'license',
      message: 'What type of license are you using for this project?',
      choices: [
        'MIT License',
        'GNU General Public License 3.0',
        'Apache License 2.0',
        'Boost Software License 1.0',
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
      name: 'test',
      message: 'Enter instructions on how to test your app?',
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
  ])
  .then((data) => {
    const {  title, description, installation, usage, test, license, contributing, github, email, tableOfContentsSections,} = data;

    let licenseBadgeURL = '';

    switch (license) {
      case 'MIT License':
        licenseBadgeURL = 'https://img.shields.io/badge/License-MIT-yellow.svg';
        break;
      case 'GNU General Public License 3.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-GPL%20v3-blue.svg';
        break;
      case 'Apache License 2.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-Apache%202.0-blue.svg';
        break;
      case 'Boost Software License 1.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-Boost%201.0-lightblue.svg';
        break;
      case 'BSD 2-Clause License':
        licenseBadgeURL = 'https://img.shields.io/badge/License-BSD%202--Clause-orange.svg';
        break;
      case 'BSD 3-Clause License':
        licenseBadgeURL = 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg';
        break;
      case 'GNU Lesser General Public License 3.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-LGPL%20v3-blue.svg';
        break;
      case 'Mozilla Public License 2.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg';
        break;
      case 'ISC License':
        licenseBadgeURL = 'https://img.shields.io/badge/License-ISC-blue.svg';
        break;
      case 'The Unlicense':
        licenseBadgeURL = 'https://img.shields.io/badge/license-Unlicense-blue.svg';
        break;
      case 'Eclipse Public License 2.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-EPL%202.0-red.svg';
        break;
      case 'GNU Affero General Public License 3.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-AGPL%20v3-blue.svg';
        break;
      case 'GNU General Public License 2.0':
        licenseBadgeURL = 'https://img.shields.io/badge/License-GPL%20v2-blue.svg';
        break;
      case 'Mozilla Public License 1.1':
        licenseBadgeURL = 'https://img.shields.io/badge/License-MPL%201.1-brightgreen.svg';
        break;
      case 'GNU Lesser General Public License 2.1':
        licenseBadgeURL = 'https://img.shields.io/badge/License-LGPL%202.1-blue.svg';
        break;
    }

    let tableOfContents = '';

    if (tableOfContentsSections && tableOfContentsSections.length > 0) {
      tableOfContents += '## Table of Contents\n';
      tableOfContentsSections.forEach((section) => {
        tableOfContents += `- [${section}](#${section.toLowerCase()})\n`;
      });
    }

    const readmeMdContent = `
# ${title}

[![${license}](${licenseBadgeURL})](LICENSE)

This project is licensed under ${license}


## Description
${description}

${tableOfContents}

## Installation
${installation}

## Usage
${usage}

## License 
This project is licensed under [${license}](License)

## Contributing
${contributing}
## Test Instructions
${test}

## Questions
GitHub: [${github}](https://github.com/${github})
For any additional questions, please feel free to contact me at ${email}.
`;

    fs.writeFile('readme.md', readmeMdContent, (err) => {
      if (err) {
        console.error('Error writing readme.md file:', err);
      } else {
        console.log('readme.md file created successfully!');
      }
    });
  });