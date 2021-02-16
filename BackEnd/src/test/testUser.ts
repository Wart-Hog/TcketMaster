import request from 'supertest'
const app = require('../app');

// describe("Get Test", () => {
//     it('/users [200]', (done) => { 
//         request(app).get('/users').expect(200,done);
//     });
//     it('/users/:username [200]', (done) => {//ok
//         request(app).get('/users/pincpall').set("token", "TJV26ZueLNNd445eQRcWJP").expect(200,done);
//     });
//     it('/users/:username [401]', (done) => {//ok
//         request(app).get('/users/pincpall').set("token", "null").expect(401,done);
//     });
//     it('/users/:username/tickets [200]', (done) => {//ok
//         request(app).get('/users/pincpall').set("token", "TJV26ZueLNNd445eQRcWJP").expect(200,done);
//     });
//     it('/users/:username/tickets [401]', (done) => {//ok
//         request(app).get('/users/pincpall').set("token", "null").expect(401,done);
//     });
// });

describe("Post test",()=>{
    it('users [201]',(done)=>{//ok
        request(app).post('/users').send({name:"pippo",username:"pippo",password:'pippo'}).expect(201,done);
    });
    it('users/login [200]',(done)=>{//ok
        request(app).post('/users/login').send({username:'pippo',password:'pippo'}).expect(200,done);
    });
    it('users/login [404]',(done)=>{//ok
        request(app).post('/users/login').send({username:'pincpalla',password:'pincpall'}).expect(404,done);
    });
    it('/users/:username/tickets [201]', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "TJV26ZueLNNd445eQRcWJP").send({eventId:"4f6dfac1-31a5-4097-93ab-3d5d8e9bae19"}).expect(201,done);
    });
    it('/users/:username/tickets [401]', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "null").send({eventId:"fc86c927-020b-446a-a329-049bd3b20395"}).expect(401,done);
    });
    it('/users/:username/tickets [404]', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "TJV26ZueLNNd445eQRcWJP").send({eventId:"null"}).expect(404,done);
    });
});

// describe('Delete test',()=>{
//     it('/users [201]',(done)=>{//ok
//         request(app).delete('/users/pluto').set("token","CBhArUkJP4nPu45oLCGfYT").expect(201,done)
//     });
//     it('/users [401]',(done)=>{//ok
//         request(app).delete('/users/pippo2').set("token","null").expect(401,done)
//     });
// });


