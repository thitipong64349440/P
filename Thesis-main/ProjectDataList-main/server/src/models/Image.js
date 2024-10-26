module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        files:{
            type: DataTypes.JSON
        },
        name: DataTypes.STRING,
        data: DataTypes.BLOB
    })
    return Image
}