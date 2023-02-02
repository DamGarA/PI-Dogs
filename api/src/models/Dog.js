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
      unique: true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isHeightValid(value) {
          if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
            throw new Error('Incorrect format');
          }
        }
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isHeightValid(value) {
          if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
            throw new Error('Incorrect format');
          }
        }
      }
    },
    life_span: {
      type: DataTypes.STRING,
      defaultValue: "Unknown",
      validate: {
        isHeightValid(value) {
          if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
            throw new Error('Incorrect format');
          }
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://comodibujar.club/wp-content/uploads/2019/03/dibujar-perro-kawaii-1.jpg",
      validate: {
        isImageUrl(value) {
          if (!/\.(jpg|jpeg|png|gif)$/i.test(value)) {
            throw new Error("Only .jpg, .jpeg, .png y .gif are allowed");
          }
        }
      }
    }
  },{
    timestamps: false
  });
};
