const inquirerService = require("inquirer");
const chalk = require("chalk");
const { userChoice } = require("../consts/consts");

module.exports = {
  askUserData: () => {
    const questions = [
      {
        name: "name",
        type: "input",
        message: "Enter your name:",
        validate: value => validateRequiredField(value, "Name")
      },
      {
        name: "email",
        type: "input",
        message: "Enter your email:",
        validate: value => validateRequiredField(value, "email")
      },
      {
        name: "client_id",
        type: "input",
        message: "Enter your client_id:",
        validate: value => validateRequiredField(value, "client_id")
      }
    ];

    return inquirerService.prompt(questions);
  },
  askUserChoice: () => {
    const questions = [
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          {
            name: "Get average length of posts per month",
            value: userChoice.averagePostsLength
          },
          {
            name: "Get average number of posts per user per month",
            value: userChoice.averageNumberOfPostsPerUser
          },
          {
            name: "Get longest posts per month",
            value: userChoice.longestPostPerMonth
          },
          {
            name: "Get total posts per week",
            value: userChoice.totalPostsByWeek
          },
          new inquirerService.Separator(),
          { name: "Exit", value: userChoice.exit }
        ]
      }
    ];

    return inquirerService.prompt(questions);
  },
  askUserIfSomethingWentWrong: message => {
    const questions = [
      {
        name: "choice",
        type: "list",
        message,
        choices: [
          {
            name: "Ok, Retry",
            value: userChoice.retry
          },
          new inquirerService.Separator(),
          {
            name: "Exit",
            value: userChoice.exit
          }
        ]
      }
    ];

    return inquirerService.prompt(questions);
  }
};

const validateRequiredField = (value, name) => {
  if (value.length) {
    return true;
  } else {
    return `Please enter your ${name}`;
  }
};
