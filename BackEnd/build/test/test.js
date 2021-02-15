"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app = require('../app');
describe("Get Test", function () {
    it('/users', function (done) {
        supertest_1.default(app).get('/users').expect(200, done);
    });
    it('/users/:username', function (done) {
        supertest_1.default(app).get('/users/pincpall').set("token", "SmBXNhpsvFYHmerR9WNzXm").expect(200, done);
    });
});
