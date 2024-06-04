const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "juan@gmail.com",
        password: "12345",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /hotels debe traer todas los hoteles', async () => {
    const res = await request(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /hotels debe crear un hotel', async () => {
    const hotelsBody = {
        name: "test name",
        description: "test description",
        price: 2000,
        imageDescription: "test image description",
        address: "bucaramanaga",
        lat: 10,
        lon: 10,
    }
    const res = await request(app)
        .post('/hotels')
        .send(hotelsBody)
        .set('Authorization', `Bearer ${token}`);
       
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(hotelsBody.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /hotels/:id debe actualizar un hotel', async () => {
    const hotelsBody = {
        name: 'test name update'
    }
    const res = await request(app).put(`/hotels/${id}`)
        .send(hotelsBody)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(hotelsBody.name);
});

test('DELETE /hotels/:id debe eliminar un hotel', async () => {
    const res = await request(app)
        .delete('/hotels/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});