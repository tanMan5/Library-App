module.exports = function(sequelize, DataTypes) {
  const Ratings = sequelize.define("Ratings", {
    ratingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    ratingNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    rated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      len: [1]
    }
  });
  Ratings.associate = function(models) {
    Ratings.belongsTo(models.Books, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Ratings;
};
