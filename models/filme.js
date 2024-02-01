const Sequelize = require ('sequelize');
const db= require ('./db');
const sequelize = require('./db');

const Filme = db.define('filmes',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    assessment: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
    }
});

//Filme.sync();

module.exports = Filme;