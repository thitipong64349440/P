module.exports = (sequelize, DataTypes) => {
    const Quatation = sequelize.define('Quatation', {
        quotation_id: DataTypes.STRING,
        company_name: DataTypes.STRING,
        product_name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        shop_name: DataTypes.STRING,
        shop_Id: DataTypes.INTEGER,
        company_Id: DataTypes.INTEGER,
        address: DataTypes.STRING,
        price: DataTypes.INTEGER,
        name: DataTypes.STRING
    })
    return Quatation
}