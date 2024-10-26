module.exports = (sequelize, DataTypes) => {
    const Post_Company = sequelize.define('Post_Company', {
        company_name: DataTypes.STRING,
        product_name: DataTypes.STRING,
        purpose: DataTypes.STRING,
        category: DataTypes.STRING,
        detail: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        shop_name: DataTypes.STRING,
        shop_Id: DataTypes.INTEGER,
    })
    return Post_Company
}