
//import { getTestToken } from '../middle/middlewere';
const app = require('../app');
import { before } from 'mocha';
import request from 'supertest'
let testIdEvent = ""
let testToken = ""

describe("creo utente per i test",async () => {
    it('new user [201]',(done)=>{//ok
        request(app).post('/users').send({name: "testName", username:'testUsername',password:'testPassword'}).expect(201,done);
    });
    it('login user and set token [200]',async ()=>{//ok
        const {body} = await request(app).post('/users/login').send({username:'testUsername',password:'testPassword'}).expect(201)
        testToken = body
    });
});
describe('create event',()=>{
    it('/success creating event [201]',async ()=>{//ok
        const {body: {id}} = await request(app).post('/events').set("token",`${testToken}`).send({name:"testEvento",type:"music",place:"testPlace",dateTime:"1/1/2000",price:"10"}).expect(201)
        testIdEvent = id
    });
    it('/get created event', (done) => {//ok 
        request(app).get(`/events/${testIdEvent}`).expect(200,done);
    });
    it('/unauth creation', (done)=>{//ok
        request(app).post('/events').set("token",'_').send({name:"testEvento",type:"music",place:"testPlace",dateTime:"1/1/2000",price:"10"}).expect(401,done)
    });
    it('/events [400] wrong date format', (done)=>{//ok
        request(app).post('/events').set("token",`${testToken}`).send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"null",price:"10"}).expect(400,done)
    });
    it('/events [400] wrong type format', (done)=>{//ok 
        request(app).post('/events').set("token",`${testToken}`).send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(400,done)
    });
});
describe(" Delete Event", ()=>{
    it('/delete success [201]',(done)=>{//ok
        request(app).delete(`/events/${testIdEvent}`).set("token",`${testToken}`).expect(201,done)
    });
    it('/delete event not found [404]',(done)=>{//ok
        request(app).delete(`/events/${testIdEvent}`).set("token",`${testToken}`).expect(404,done)
    });
    it('/delete unauthorized  [401]',(done)=>{//ok
        request(app).delete(`/events/${testIdEvent}`).set("token","_").expect(401,done)
    });
});
describe("elimino utente test",()=>{
    it('delete success [201]',(done)=>{//ok
        request(app).delete('/users/testUsername').set("token",`${testToken}`).expect(201,done)
    });  
})
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

