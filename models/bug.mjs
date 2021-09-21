export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define('bug', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    problem: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    error_text: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    commit: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    feature_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'features',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
