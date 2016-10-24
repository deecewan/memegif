module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn('Searches', 'youtubeTitle', Sequelize.STRING);
  },

  down(queryInterface) {
    queryInterface.removeColumn('Searches', 'youtubeTitle');
  },
};
