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
//import { getTestToken } from '../middle/middlewere';
var app = require('../app');
var supertest_1 = __importDefault(require("supertest"));
var testIdEvent = "";
var testToken = "";
describe("creo utente per i test", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('new user [201]', function (done) {
            supertest_1.default(app).post('/users').send({ name: "testName", username: 'testUsername', password: 'testPassword' }).expect(201, done);
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
        return [2 /*return*/];
    });
}); });
describe('create event', function () {
    it('/success creating event [201]', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app).post('/events').set("token", "" + testToken).send({ name: "testEvento", type: "music", place: "testPlace", dateTime: "1/1/2000", price: "10" }).expect(201)];
                case 1:
                    id = (_a.sent()).body.id;
                    testIdEvent = id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('/get created event', function (done) {
        supertest_1.default(app).get("/events/" + testIdEvent).expect(200, done);
    });
    it('/unauth creation', function (done) {
        supertest_1.default(app).post('/events').set("token", '_').send({ name: "testEvento", type: "music", place: "testPlace", dateTime: "1/1/2000", price: "10" }).expect(401, done);
    });
    it('/events [400] wrong date format', function (done) {
        supertest_1.default(app).post('/events').set("token", "" + testToken).send({ name: "nomeevento", type: "music", place: "placeevento", dateTime: "null", price: "10" }).expect(400, done);
    });
    it('/events [400] wrong type format', function (done) {
        supertest_1.default(app).post('/events').set("token", "" + testToken).send({ name: "nomeevento", type: "null", place: "placeevento", dateTime: "1/1/2000", price: "10" }).expect(400, done);
    });
});
describe(" Delete Event", function () {
    it('/delete success [201]', function (done) {
        supertest_1.default(app).delete("/events/" + testIdEvent).set("token", "" + testToken).expect(201, done);
    });
    it('/delete event not found [404]', function (done) {
        supertest_1.default(app).delete("/events/" + testIdEvent).set("token", "" + testToken).expect(404, done);
    });
    it('/delete unauthorized  [401]', function (done) {
        supertest_1.default(app).delete("/events/" + testIdEvent).set("token", "_").expect(401, done);
    });
});
describe("elimino utente test", function () {
    it('delete success [201]', function (done) {
        supertest_1.default(app).delete('/users/testUsername').set("token", "" + testToken).expect(201, done);
    });
});
// it('/events [400] errore nella data', (done)=>{//ok
//     request(app).post('/events').set("token","TJV26ZueLNNd445eQRcWJP").send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"null",price:"10"}).expect(400,done)
// });
// it('/events [400] errore nel type', (done)=>{//ok 
//     request(app).post('/events').set("token","TJV26ZueLNNd445eQRcWJP").send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(400,done)
// });
// it('/events [401]', (done)=>{//ok
//     request(app).post('/events').send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).set("token","null").expect(401,done)
// })
//})  
// describe("Get Test", async () => {
//     it('/events [200]', (done) => {//ok
//         request(app).get('/events').expect(200,done);
//     });
//     it('/events/music [200]', (done) => {//ok
//         request(app).get('/events/music').expect(200,done);
//     });
//     it('/events/theatre [200]', (done) => {//ok
//         request(app).get('/events/theatre').expect(200,done);
//     });
//     it('/events/sport [200]', (done) => {//ok
//         request(app).get('/events/sport').expect(200,done);
//     });
//     it('/events/:id [200]', (done) => {//ok 
//         request(app).get('/events/testId').expect(200,done);
//     });
//     it('/events/:id [404]', (done) => {//ok 
//         request(app).get('/events/idACasoCheNonEsiste').expect(404,done);
//     });
// });
