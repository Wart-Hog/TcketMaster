import {expect} from 'chai';
import request from 'supertest'
const app = require('../app');

describe("Get Test", () => {
    it('/users [200]', (done) => { //ok
        request(app).get('/users').expect(200,done);
    });
    it('/users/:username [200]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "SmBXNhpsvFYHmerR9WNzXm").expect(200,done);
    });
    it('/users/:username [401]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "null").expect(401,done);
    });
    it('/users/:username/tickets [200]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "SmBXNhpsvFYHmerR9WNzXm").expect(200,done);
    });
    it('/users/:username/tickets [401]', (done) => {//ok
        request(app).get('/users/pincpall').set("token", "null").expect(401,done);
    });
});

describe("POST test",()=>{
    
});