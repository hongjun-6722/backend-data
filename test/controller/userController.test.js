// import app from '../../app';
// import request from 'supertest';
// import { expect } from 'chai';

// describe('用户接口测试', () => {
//   let server;
//   before(() => {
//     server = app.listen(5000);
//   });

//   after(() => {
//     if (server) {
//       server.close();
//     }
//   });

//   it('#用户新增测试', async () => {
//     await request(server)
//       .post('/api/user')
//       .send({ phone: '15505752823', password: '123456', nickName: '你说呢' })
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .expect(res => {
//         let response = res.body;
//         expect(response.code).to.be.equal(200, '用户新增异常');
//       });
//   });

//   it('#用户查询测试', async () => {
//     let userId = 2;
//     await request(server)
//       .get(`/api/user/${userId}`)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .expect(res => {
//         let response = res.body;
//         expect(response.code).to.be.equal(200, '用户查询异常');
//       });
//   });

//   it('#用户更新测试', async () => {
//     let user = { id: 2, password: '123456789' };
//     await request(server)
//       .put(`/api/user`)
//       .send(user)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .expect(res => {
//         let response = res.body;
//         expect(response.code).to.be.equal(200, '用更新异常');
//       });
//   });
// });
