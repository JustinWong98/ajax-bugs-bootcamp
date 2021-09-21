module.exports = {
  up: async (queryInterface) => {
    // Define category data
    const featuresData = [
      {
        name: 'form',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'coolThing',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'evenCoolerThing',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'login',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'logout',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert categories
    await queryInterface.bulkInsert('features', featuresData, {
      returning: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('features', null, {});
  },
};
