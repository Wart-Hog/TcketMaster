import {expect} from 'chai';
import request from 'supertest'
const app = require('../app');

describe("Get Test", () => {
    it('/users', (done) => {
        request(app).get('/users').expect(200,done);
    });
    it('/users/:username', (done) => {
        request(app).get('/users/pincpall').set("token", "SmBXNhpsvFYHmerR9WNzXm").expect(200,done);
    });
});