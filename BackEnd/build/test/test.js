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
        supertest_1.default(app).get('/users/pincpall').set("token", "SmBXNhpsvFYHmerR9WNzXm").expect(200, done);
    });
    it('/users/:username [401]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "null").expect(401, done);
    });
    it('/users/:username/tickets [200]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "SmBXNhpsvFYHmerR9WNzXm").expect(200, done);
    });
    it('/users/:username/tickets [401]', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "null").expect(401, done);
    });
});
