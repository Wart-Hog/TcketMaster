"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app = require('../app');
describe("Get Test", function () {
    it('/events [200]', function (done) {
        supertest_1.default(app).get('/events').expect(200, done);
    });
    it('/events/music [200]', function (done) {
        supertest_1.default(app).get('/events/music').expect(200, done);
    });
    it('/events/theatre [200]', function (done) {
        supertest_1.default(app).get('/events/theatre').expect(200, done);
    });
    it('/events/sport [200]', function (done) {
        supertest_1.default(app).get('/events/sport').expect(200, done);
    });
    it('/events/:id [200]', function (done) {
        supertest_1.default(app).get('/events/90d02608-090d-4730-b265-d79f97c1ea06').expect(200, done);
    });
    it('/events/:id [404]', function (done) {
        supertest_1.default(app).get('/events/idACasoCheNonEsiste').expect(404, done);
    });
});
describe('Post Test', function () {
    it('/events [201]', function (done) {
        supertest_1.default(app).post('/events').set("token", "Ummf3bjZ68WuLu3Qnjp7UH").send({ name: "nomeevento", type: "music", place: "placeevento", dateTime: "1/1/2000", price: "10" }).expect(201, done);
    });
    it('/events [400] errore nella data', function (done) {
        supertest_1.default(app).post('/events').set("token", "Ummf3bjZ68WuLu3Qnjp7UH").send({ name: "nomeevento", type: "music", place: "placeevento", dateTime: "null", price: "10" }).expect(400, done);
    });
    it('/events [400] errore nel type', function (done) {
        supertest_1.default(app).post('/events').set("token", "Ummf3bjZ68WuLu3Qnjp7UH").send({ name: "nomeevento", type: "null", place: "placeevento", dateTime: "1/1/2000", price: "10" }).expect(400, done);
    });
    it('/events [401]', function (done) {
        supertest_1.default(app).post('/events').set("token", "null").expect(401, done);
    });
});
