module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        company_name: DataTypes.STRING,
        shop_name: DataTypes.STRING,
        address: DataTypes.STRING,
        tel: DataTypes.INTEGER,
        type: DataTypes.STRING
    })
    Person.prototype.comparePassword = function (password) {
        if (password == this.password) {
            return true
        }
        return false
    }
    Person.associate = function (models) { }

    return Person
} 