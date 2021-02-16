import request from 'supertest'
const app = require('../app');

describe("Get Test", () => {
    it('/users [200]', (done) => { 
        request(app).get('/users').expect(200,done);
    });
    it('/users/:username [200]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "LGB3G9e2tpq6PTFpj1Ssn5").expect(200,done);
    });
    it('/users/:username [401]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "null").expect(401,done);
    });
    it('/users/:username/tickets [200]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "LGB3G9e2tpq6PTFpj1Ssn5").expect(200,done);
    });
    it('/users/:username/tickets [401]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "null").expect(401,done);
    });
});

describe("Post test",()=>{
    it('users [201]',(done)=>{//ok
        request(app).post('/users').send({name:"pippo",username:"pluto",password:'pippo'}).expect(200,done);
    });
    it('users/login [200]',(done)=>{//ok
        request(app).post('/users/login').send({username:'pluto',password:'pippo'}).expect(200,done);
    });
    it('users/login [404]',(done)=>{//ok
        request(app).post('/users/login').send({username:'pincpalla',password:'pincpall'}).expect(404,done);
    });
    it('/users/:username/tickets [200]', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "C9ioCXoenoTTvWKyvBDKKD").send({eventId:"4f6dfac1-31a5-4097-93ab-3d5d8e9bae19"}).expect(200,done);
    });
    it('/users/:username/tickets [401]', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "null").send({eventId:"4f6dfac1-31a5-4097-93ab-3d5d8e9bae19"}).expect(401,done);
    });
    it('/users/:username/tickets [404]', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "C9ioCXoenoTTvWKyvBDKKD").send({eventId:"null"}).expect(404,done);
    });
});

describe('Delete test',()=>{
    it('/users [201]',(done)=>{//ok
        request(app).delete('/users').set("token","Xo7MsuSZN91ET7wPoLZ8eJ").send({username:"pluto"}).expect(201,done)
    });
    it('/users [401]',(done)=>{//ok
        request(app).delete('/users').set("token","null").send({username:"pluto"}).expect(401,done)
    });
    it('/users [404]',(done)=>{//ok
        request(app).delete('/users').set("token","C9ioCXoenoTTvWKyvBDKKD").send({username:"mario"}).expect(404,done)
    });
});
