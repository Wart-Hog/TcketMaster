"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app = require('../app');
describe("Get Test", function () {
    it('/users [200]', function (done) {
        supertest_1.default(app).get('/users').expect(200, done);
    });
    it('/users/:username [200]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "E2h7nrvWLpJJoFya8SpXpG").expect(200, done);
    });
    it('/users/:username [401]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "null").expect(401, done);
    });
    it('/users/:username/tickets [200]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "E2h7nrvWLpJJoFya8SpXpG").expect(200, done);
    });
    it('/users/:username/tickets [401]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "null").expect(401, done);
    });
});
describe("Post test", function () {
    it('users [201]', function (done) {
        supertest_1.default(app).post('/users').send({ name: "pippo", username: "pippo", password: 'pippo' }).expect(200, done);
    });
    it('users/login [200]', function (done) {
        supertest_1.default(app).post('/users/login').send({ username: 'pippo', password: 'pippo' }).expect(200, done);
    });
    it('users/login [404]', function (done) {
        supertest_1.default(app).post('/users/login').send({ username: 'pincpalla', password: 'pincpall' }).expect(404, done);
    });
    it('/users/:username/tickets [200]', function (done) {
        supertest_1.default(app).post('/users/pincpall/tickets').set("token", "E2h7nrvWLpJJoFya8SpXpG").send({ eventId: "4f6dfac1-31a5-4097-93ab-3d5d8e9bae19" }).expect(200, done);
    });
    it('/users/:username/tickets [401]', function (done) {
        supertest_1.default(app).post('/users/pincpall/tickets').set("token", "null").send({ eventId: "4f6dfac1-31a5-4097-93ab-3d5d8e9bae19" }).expect(401, done);
    });
    it('/users/:username/tickets [404]', function (done) {
        supertest_1.default(app).post('/users/pincpall/tickets').set("token", "E2h7nrvWLpJJoFya8SpXpG").send({ eventId: "null" }).expect(404, done);
    });
});
describe('Delete test', function () {
    it('/users [201]', function (done) {
        supertest_1.default(app).delete('/users').set("token", "Xo7MsuSZN91ET7wPoLZ8eJ").send({ username: "pippo" }).expect(201, done);
    });
    it('/users [401]', function (done) {
        supertest_1.default(app).delete('/users').set("token", "null").send({ username: "pippo" }).expect(401, done);
    });
    it('/users [404]', function (done) {
        supertest_1.default(app).delete('/users').set("token", "E2h7nrvWLpJJoFya8SpXpG").send({ username: "mario" }).expect(404, done);
    });
});
describe("POST test", function () {
    it('users [201]', function (done) {
        supertest_1.default(app).post('/users').send({ name: "pippo", username: "pluto", password: 'pippo' }).expect(200, done);
    });
    it('users/login [200]', function (done) {
        supertest_1.default(app).post('/users/login').send({ username: 'pluto', password: 'pippo' }).expect(200, done);
    });
    it('users/login [404]', function (done) {
        supertest_1.default(app).post('/users/login').send({ username: 'pincpalla', password: 'pincpall' }).expect(404, done);
    });
    it('/users/:username/tickets [200]', function (done) {
        supertest_1.default(app).post('/users/pincpall/tickets').set("token", "E2h7nrvWLpJJoFya8SpXpG").send({ eventId: "4f6dfac1-31a5-4097-93ab-3d5d8e9bae19" }).expect(200, done);
    });
    it('/users/:username/tickets [401]', function (done) {
        supertest_1.default(app).post('/users/pincpall/tickets').set("token", "null").send({ eventId: "4f6dfac1-31a5-4097-93ab-3d5d8e9bae19" }).expect(401, done);
    });
    it('/users/:username/tickets [404]', function (done) {
        supertest_1.default(app).post('/users/pincpall/tickets').set("token", "E2h7nrvWLpJJoFya8SpXpG").send({ eventId: "null" }).expect(404, done);
    });
});
describe('DELETE test', function () {
    it('/users [201]', function (done) {
        supertest_1.default(app).delete('/users').set("token", "Xo7MsuSZN91ET7wPoLZ8eJ").send({ username: "pluto" }).expect(201, done);
    });
    it('/users [401]', function (done) {
        supertest_1.default(app).delete('/users').set("token", "null").send({ username: "pluto" }).expect(401, done);
    });
    it('/users [404]', function (done) {
        supertest_1.default(app).delete('/users').set("token", "E2h7nrvWLpJJoFya8SpXpG").send({ username: "mario" }).expect(404, done);
    });
});
