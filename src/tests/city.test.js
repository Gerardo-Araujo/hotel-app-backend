const request = require('supertest');
const app = require('../app');

let id;
let token;

// 1. POST /users
// 2. POST /users/login
// 3. Resto de los tests

beforeAll(async() => {
    const credentials =  {
        email: "juan@gmail.com",
        password: "12345",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /cities debe crear un ciudad', async () => {
    const body = {
        name: "Bucaramanga",
        country: "Colombia",
        countryId: "CO"
    }
    const res = await request(app)
    .post('/cities').send(body)
    .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('GET /cities debe traer todos las ciudades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200); // tb
    expect(res.body).toBeInstanceOf(Array); // tbi
});


test('PUT /cities/:id debe actualizar una ciudad', async () => {
    const body = {
        name: 'Bucaramanga Santander'
    }
    const res = await request(app)
    .put(`/cities/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /cities/:id debe eliminar una ciudad', async () => {
    const res = await request(app)
    .delete(`/cities/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
