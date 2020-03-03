const inquirerService = require('inquirer');
const { userChoice } = require('../consts/consts');

module.exports = {
  askUserData: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Enter your name',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your name.';
          }
        }
      },
      {
        name: 'email',
        type: 'input',
        message: 'Enter your email:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your email.';
          }
        }
      },
      {
        name: 'client_id',
        type: 'input',
        message: 'Enter your client_id:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your client_id.';
          }
        }
      }
    ];

    return inquirerService.prompt(questions);
  },
  askUserChoice: () => {
    const questions = [
      {
        name: 'choice',
        type: 'list',
        message: "What do you want?",
        choices: [
          {name: "Get average length of a posts per month", value: userChoice.averagePostsLength},
          {name: "Get average number of a posts per user per month", value: userChoice.averageNumberOfPostsPerUser},
          {name: "Get longest posts per month", value: userChoice.longestPostPerMonth},
          new inquirerService.Separator(),
          {name: "Exit", value: userChoice.exit}
        ]
      }
    ];


    return inquirerService.prompt(questions);
  }
};