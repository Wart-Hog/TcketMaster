import request from 'supertest'
const app = require('../app');

describe("Get Test", () => {
    it('/events [200]', (done) => {//ok
        request(app).get('/events').expect(200,done);
    });
    it('/events/music [200]', (done) => {//ok
        request(app).get('/events/music').expect(200,done);
    });
    it('/events/theatre [200]', (done) => {//ok
        request(app).get('/events/theatre').expect(200,done);
    });
    it('/events/sport [200]', (done) => {//ok
        request(app).get('/events/sport').expect(200,done);
    });
    it('/events/:id [200]', (done) => {//ok 
        request(app).get('/events/90d02608-090d-4730-b265-d79f97c1ea06').expect(200,done);
    });
    it('/events/:id [404]', (done) => {//ok 
        request(app).get('/events/idACasoCheNonEsiste').expect(404,done);
    });
});

describe('Post Test',()=>{
    it('/events [201]', (done)=>{//ok
        request(app).post('/events').set("token","Ummf3bjZ68WuLu3Qnjp7UH").send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(201,done)
    });
    it('/events [400] errore nella data', (done)=>{//ok
        request(app).post('/events').set("token","Ummf3bjZ68WuLu3Qnjp7UH").send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"null",price:"10"}).expect(400,done)
    });
    it('/events [400] errore nel type', (done)=>{//ok 
        request(app).post('/events').set("token","Ummf3bjZ68WuLu3Qnjp7UH").send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(400,done)
    });
    it('/events [401]', (done)=>{//ok
        request(app).post('/events').set("token","null").expect(401,done)
    })
})