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

  const switchChoice = async () => {
    const { choice } = await inquirer.askUserChoice();

    if (choice === userChoice.averagePostsLength) {
      const result = dataProcessingService.getAveragePostLengthPerMonth(posts);
      console.table(result);
    }

    if (choice === userChoice.longestPostPerMonth) {
      const result = dataProcessingService.getLongestPostsPerMonth(posts);
      console.table(result)
    }

    if (choice === userChoice.averageNumberOfPostsPerUser) {
      const result = dataProcessingService.getAverageNumberOfPostsPerUserPerMonth(posts);
      console.table(result);
    }

    if (choice === userChoice.exit) {
      console.log("Bye!");
      process.exit();
    }

    switchChoice();
  };

  switchChoice();
};

run();