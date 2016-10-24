export default function (sequelize, DataTypes) {
  const Search = sequelize.define('Search', {
    term: DataTypes.STRING,
    type: DataTypes.ENUM('url', 'search'), // eslint-disable-line
  }, {
    classMethods: {
      associate: models => {
        Search.belongsTo(models.User);
      },
    },
  });

  return Search;
}
