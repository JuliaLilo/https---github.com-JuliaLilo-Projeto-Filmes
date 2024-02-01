const Sequelize = require ('sequelize');

const sequelize = new Sequelize ("filme", "root", "Br@ncaraposa2006", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com sucesso")
}).catch(function(){
    console.log("Erro: Conexão com banco de dados não realizada");
});

module.exports = sequelize;
