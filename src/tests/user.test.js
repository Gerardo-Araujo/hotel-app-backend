const request = require('supertest');
const app = require('../app');
const { login } = require('../controllers/user.controllers');


let id;
let token;

// 1. POST /users
// 2. POST /users/login
// 3. Resto de los tests

test('POST /users debe crear un user', async () => {
    const body = {
        firstName: "test user",
        lastName: "test User",
        email: "test1234@gmail.com",
        password: "12345",
        gender: "other",
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});



test('POST /users/login debe loggear al usuario', async () => { 
    const credentials =  {
        email: 'test1234@gmail.com',
        password: '12345',
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email);
 });

 
test('GET /users debe traer todos los usuarios', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200); // tb
    expect(res.body).toBeInstanceOf(Array); // tbi
});

 test('POST /users/login con credencial incorrecto debe dar error', async () => { 
    const credentials = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto1234',
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials);
   expect(res.status).toBe(401);
})

test('PUT /users/:id debe actualizar un usuario', async () => {
    const body = {
        firstName: "test user",
        lastName: "test User",
        email: "test1234@gmail.com  ",
        password: "12345",
        gender: "other",
    }
    const res = await request(app)
    .put(`/users/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
