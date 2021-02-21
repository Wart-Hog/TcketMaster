"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app = require('../app');
var testToken = "";
describe("Post auth required", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('new user [201]', function (done) {
            supertest_1.default(app).post('/users').send({ name: "testName", username: 'testUsername', password: 'testPassword' }).expect(201, done);
        });
        it('new user fail', function (done) {
            supertest_1.default(app).post('/users').send({ password: 'testPassword' }).expect(400, done);
        });
        it('new username already exist [403]', function (done) {
            supertest_1.default(app).post('/users').send({ name: "testName", username: 'testUsername', password: 'testPassword' }).expect(400, done);
        });
        it('login user not found[404]', function (done) {
            supertest_1.default(app).post('/users/login').send({ username: '_', password: '_' }).expect(404, done);
        });
        it('login user and set token [200]', function () { return __awaiter(void 0, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(app).post('/users/login').send({ username: 'testUsername', password: 'testPassword' }).expect(201)];
                    case 1:
                        body = (_a.sent()).body;
                        testToken = body;
                        return [2 /*return*/];
                }
            });
        }); });
        it('user to admin', function (done) {
            supertest_1.default(app).put('/users/testUsername').send({ admin: true }).expect(201, done);
        });
        it('buy ticket not found', function (done) {
            supertest_1.default(app).post('/users/testUsername/tickets').set("token", "" + testToken).send({ eventId: "__" }).expect(404, done);
        });
        it('buy new ticket', function (done) {
            supertest_1.default(app).post('/users/testUsername/tickets').set("token", "" + testToken).send({ eventId: "beda3f20-4321-4cd9-a969-b89c9969149f" }).expect(201, done);
        });
        it('get user details[200]', function (done) {
            supertest_1.default(app).get('/users/testUsername').set("token", "" + testToken).expect(200, done);
        });
        it('buy ticket invalid token', function (done) {
            supertest_1.default(app).post('/users/pincpall/tickets').set("token", "_").send({ eventId: "fc86c927-020b-446a-a329-049bd3b20395" }).expect(401, done);
        });
        return [2 /*return*/];
    });
}); });
describe('get auth required', function () {
    it('invalid token user [401]', function (done) {
        supertest_1.default(app).get('/users/testUsername').set("token", "_").expect(401, done);
    });
    it('get all users [200]', function () {
        supertest_1.default(app).get('/users').expect(200);
    });
});
describe("change details and delete", function () {
    it('change details, username already in use', function (done) {
        supertest_1.default(app).put('/users/testUsername/details').set("token", "" + testToken).send({ name: "newtestName", username: 'pincpall', password: 'newtestPassword' }).expect(400, done);
    });
    it('change details', function (done) {
        supertest_1.default(app).put('/users/testUsername/details').set("token", "" + testToken).send({ name: "newtestName", username: 'NtestUsername', password: 'newtestPassword' }).expect(201, done);
    });
    it('/delete invalid token [401]', function (done) {
        supertest_1.default(app).delete('/users/NtestUsername').set("token", "_").expect(401, done);
    });
    it('/delete user not found [404]', function (done) {
        supertest_1.default(app).delete('/users/_').set("token", "" + testToken).expect(404, done);
    });
    it('delete success [201]', function (done) {
        supertest_1.default(app).delete('/users/NtestUsername').set("token", "" + testToken).expect(201, done);
    });
});
