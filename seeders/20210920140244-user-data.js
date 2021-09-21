const jsSHA = require('jssha');

const SALT = 'help';

const getHash = (input) => {
  // create new SHA object
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // create an unhashed cookie string based on user ID and salt
  const unhashedString = `${input}-${SALT}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
};
module.exports = {
  up: async (queryInterface) => {
    // Define category data
    const usersData = [
      {
        email: 'janedoe@gmail.com',
        password: `${getHash('password1')}`,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // const bugsUserIDInsert = [];
    // // redo and get last ID of all bugs
    // for (let i = 0; i < 5; i += 1) {
    //   bugsUserIDInsert.push(
    //     { user_id: 1 },
    //   );
    // }
    // Bulk insert categories
    await queryInterface.bulkInsert('users', usersData, {
      returning: true,
    });
    // await queryInterface.bulkInsert('bugs', bugsUserIDInsert, {
    //   returning: true,
    // });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
