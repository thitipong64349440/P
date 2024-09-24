module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        company_name: DataTypes.STRING,
        shop_name: DataTypes.STRING,
        product_name: DataTypes.STRING,
        comment: DataTypes.TEXT,
        postCId: DataTypes.INTEGER,
        shopId: DataTypes.INTEGER,
        personId: DataTypes.INTEGER,
        type: DataTypes.STRING
    })
    return Message
}