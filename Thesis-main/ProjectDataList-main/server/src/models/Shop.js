module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define('Shop', {
        shop_name: DataTypes.STRING,
        shop_img: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        product_name: DataTypes.STRING,
        purpose: DataTypes.STRING,
        category: DataTypes.STRING,
        detail: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        company_name: DataTypes.STRING,
        companyId: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
    })
    return Shop
}