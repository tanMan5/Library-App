module.exports = function(sequelize, DataTypes) {
    const Books = sequelize.define("Books", {
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        }
    });
    Books.associate = function (models) {
        Books.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Books;
};