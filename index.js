#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import shell from 'shelljs';
import fs from 'fs';

console.log(chalk.blue('Welcome to Create VELN!'));
console.log(chalk.green('Let\'s set up your AI Agents.\n'));

// Define questions for the user
const questions = [
  {
    type: 'list',
    name: 'provider',
    message: 'Select a provider:',
    choices: ['GitHub', 'GitLab', 'Bitbucket'],
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name:',
    default: 'my-ai-agents',
  },
  {
    type: 'confirm',
    name: 'useTypeScript',
    message: 'Do you want to use TypeScript?',
    default: true,
  },
];


inquirer.prompt(questions).then((answers) => {
  const { provider, projectName, useTypeScript } = answers;

  console.log(chalk.yellow(`\nSetting up your project with ${provider}...`));

  if (!shell.mkdir(projectName).stderr) {
    console.log(chalk.green(`Created folder: ${projectName}`));
  } else {
    console.log(chalk.red(`Failed to create folder: ${projectName}`));
    shell.exit(1);
  }

  shell.cd(projectName);

  shell.exec('npm init -y');

  if (useTypeScript) {
    console.log(chalk.yellow('Adding TypeScript support...'));
    shell.exec('npm install typescript @types/node --save-dev');
    shell.exec('npx tsc --init');

    fs.writeFileSync(
      'src/index.ts',
      `console.log('Hello, VELN!');\n`
    );
    console.log(chalk.green('Created src/index.ts'));
  } else {

    fs.writeFileSync(
      'src/index.js',
      `console.log('Hello, VELN!');\n`
    );
    console.log(chalk.green('Created src/index.js'));
  }

  // Create .gitignore
  fs.writeFileSync(
    '.gitignore',
    `node_modules/\n.env\n`
  );

  console.log(chalk.green('Created .gitignore'));

  fs.writeFileSync(
    'README.md',
    `# ${projectName}\n\nWelcome to your new setup for creating an AI Agents!\n`
  );
  console.log(chalk.green('Created README.md'));

  console.log(chalk.green('\nProject setup complete!'));
  console.log(chalk.blue(`\nNavigate to your project: cd ${projectName}`));
  console.log(chalk.blue('Start developing! 🚀\n'));
});
