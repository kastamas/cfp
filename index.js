const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const inquirer = require("./src/services/inquirerService");
const requestsService = require("./src/services/requestsService");
const dataProcessingService = require("./src/services/dataProcessingService");
const {
  getAveragePostLengthPerMonth,
  getLongestPostsPerMonth,
  getAverageNumberOfPostsPerUserPerMonth,
  getTotalPostsByWeek
} = dataProcessingService;
const { userChoice } = require("./src/consts/consts");

const showMessage = message => {
  console.log(
    chalk.yellow(figlet.textSync(message, { horizontalLayout: "full" }))
  );
};

const exit = () => {
  showMessage("Bye!");
  process.exit();
};

clear();

showMessage("SUPERMETRICS | CLI");

const run = async () => {
  const userData = await inquirer.askUserData();
  const token = await requestsService.getToken(userData);

  if (!token) {
    const message =
      "Something wrong with your authorization, please check your credentials and try again!";
    const { choice } = await inquirer.askUserIfSomethingWentWrong(message);

    return choice === userChoice.retry ? run() : exit();
  }

  const posts = await requestsService.getPosts(token);

  const switchChoice = async () => {
    const { choice } = await inquirer.askUserChoice();

    switch (choice) {
      case userChoice.averagePostsLength:
        {
          console.table(getAveragePostLengthPerMonth(posts));
        }
        break;
      case userChoice.longestPostPerMonth:
        {
          console.table(getLongestPostsPerMonth(posts));
        }
        break;
      case userChoice.averageNumberOfPostsPerUser:
        {
          console.table(getAverageNumberOfPostsPerUserPerMonth(posts));
        }
        break;
      case userChoice.totalPostsByWeek:
        {
          console.table(getTotalPostsByWeek(posts));
        }
        break;
      case userChoice.exit:
      default: {
        exit();
      }
    }

    switchChoice();
  };

  switchChoice();
};

run();
