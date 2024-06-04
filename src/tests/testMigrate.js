const app = require('../app');
const  request  = require('supertest');
const sequelize = require('../utils/connection');
const User = require('../models/User');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const user = {
                firstName: "Juan",
                lastName: "Trujillo",
                email: "juan@gmail.com",
                password: "12345",
                gender: "other",
            
        }
        const userTest = await User.findOne({ where: { email: 'juan@gmail.com'}})
        if (!userTest){
            await request(app).post('/users').send(user);

        }



        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();