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



test('POST /bookings debe crear un booking', async () => {
    const bookingBody = {
        checkIn: "2024-12-12",
        checkOut: "2024-12-13"
    }
    const res = await request(app)
        .post('/bookings')
        .send(bookingBody)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkIn).toBe(bookingBody.checkIn);
});

test('GET /bookings debe traer todos los bookings', async () => {
    const res = await request(app)
        .get('/bookings')
        .set('Authorization', `Bearer ${token}`);
       
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /bookings/:id debe actualizar una booking', async () => {
    const body = {
        checkOut: "2024-12-14"
    }
    const res = await request(app)
    .put(`/bookings/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.checkOut).toBe(body.checkOut);
});

test('DELETE /bookings/:id debe de eliminar booking', async () => {
    const res = await request(app)
        .delete(`/bookings/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});