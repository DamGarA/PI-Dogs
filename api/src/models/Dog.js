const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heigth: {
      type: DataTypes.STRING,
      allowNull: false
      //"Entre 23 y 29 cm"
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
      //"Entre 2 y 3 kg"
    },
    life_span: {
      type: DataTypes.STRING,
      defaultValue: "Andasa"
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: "https://comodibujar.club/wp-content/uploads/2019/03/dibujar-perro-kawaii-1.jpg"
    }
  },{
    timestamps: false
  });
};
