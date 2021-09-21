module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });
    try {
      await queryInterface.addColumn('bugs', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.removeColumn('bugs', 'user_id');
      await queryInterface.dropTable('users');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
