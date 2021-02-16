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
        request(app).get('/events/beda3f20-4321-4cd9-a969-b89c9969149f').expect(200,done);
    });
    it('/events/:id [404]', (done) => {//ok 
        request(app).get('/events/idACasoCheNonEsiste').expect(404,done);
    });
});

describe('Post Test',()=>{
    it('/events [201]', (done)=>{//ok
        request(app).post('/events').set("token","E2h7nrvWLpJJoFya8SpXpG").send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(201,done)
    });
    it('/events [400] errore nella data', (done)=>{//ok
        request(app).post('/events').set("token","E2h7nrvWLpJJoFya8SpXpG").send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"null",price:"10"}).expect(400,done)
    });
    it('/events [400] errore nel type', (done)=>{//ok 
        request(app).post('/events').set("token","E2h7nrvWLpJJoFya8SpXpG").send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(400,done)
    });
    it('/events [401]', (done)=>{//ok
        request(app).post('/events').send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).set("token","null").expect(401,done)
    })
})

describe(" Delete Test", ()=>{
    it('/events [200]',(done)=>{//ok
        request(app).delete('/events').set("token","E2h7nrvWLpJJoFya8SpXpG").send({id:"beda3f20-4321-a969-b89c9969149f"}).expect(201,done)
    });
    it('/events [401]',(done)=>{//ok
        request(app).delete('/events').set("token","null").send({id:"beda3f20-4321-a969-b89c9969149f"}).expect(401,done)
    });
});