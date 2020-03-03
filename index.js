const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const inquirer  = require('./src/services/inquirerService');
const requestsService  = require('./src/services/requestsService');
const dataProcessingService  = require('./src/services/dataProcessingService');
const { userChoice } = require('./src/consts/consts');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('CFP', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const userData = await inquirer.askUserData();
  const token = await requestsService.getToken(userData);
  const posts = await requestsService.getPosts(token);

  const { choice } = await inquirer.askUserChoice();

  if (choice === userChoice.averagePostsLength) {
    const result = dataProcessingService.getAveragePostLength(posts);
    console.log(result);
  }

  if (choice === userChoice.exit) {
    process.exit();
  }

  console.log(choice);
};

run();