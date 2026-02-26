module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    CommentsBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Posts, {
      foreignKey: 'PostId',
      onDelete: 'cascade',
    });
  };
  return Comments;
};
