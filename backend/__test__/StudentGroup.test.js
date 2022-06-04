const supertest = require('supertest')
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require('mongoose')
const createserver = require('../Createserver')
const area = require('../Routes/ResearchArea')

const app = createserver()
describe("group", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })
    describe('given product not exist', () => {
        it('should', async () => {
            const cateid = "ddd";
            await supertest(area).get('/sample').expect(405)
        });
    })


    describe('given product exist', () => {
        it('should bro', async () => {

            const { statusCode, body } = await supertest(app).post('/api/researchareas/create')
                .send({ name: "hsss" })

            expect(statusCode).toBe(200)
            expect(body).toEqual({})
        });
    })

})