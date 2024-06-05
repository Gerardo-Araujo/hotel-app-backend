// const app = require('../app');
// const request = require('supertest');

// let id;
// let token;

// beforeAll(async () => {
//     const credentials = {
//         email: "juan@gmail.com",
//         password: "juan1234",
//     }
//     const res = await request(app).post('/users/login').send(credentials);
//     token = res.body.token;
// });

// test('GET /favorites debe traer todos los favoritos', async () => {
//     const res = await request(app)
//         .get('/favorites')
//         .set('Authorization', `Bearer ${token}`);
//     expect(res.status).toBe(200);
//     expect(res.body).toBeInstanceOf(Array);
// });

// test('POST /favorites debe crear un favorito', async () => {
//     const favoriteBody = {
//         rate: "5",
//     }
//     const res = await request(app)
//         .post('/favorites')
//         .send(favoriteBody)
//         .set('Authorization', `Bearer ${token}`);
//     id = res.body.id;
//     expect(res.status).toBe(201);
//     expect(res.body.id).toBeDefined();
//     expect(res.body.rate).toBe(favoriteBody.rate);
// });

// test('DELETE /favorites/:id debe eliminar un favorito', async () => {
//     const res = await request(app)
//         .delete(`/favorites/${id}`)
//         .set('Authorization', `Bearer ${token}`);
//     expect(res.status).toBe(204);
// });
