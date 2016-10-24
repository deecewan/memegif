export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate: models => {
        User.hasMany(models.Search);
      },
    },
    instanceMethods: {},
    getterMethods: {
      redacted: function test() {
        const { id, name, email, searches } = this;
        return { id, name, email, searches }; // lowercase searches looks nicer
      },
      searches: function searches() {
        return this.Searches;
      },
    },
  });

  return User;
}
