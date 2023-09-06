const app = require('../app');
const mongoose = require("mongoose");
const request = require("supertest");
require('dotenv').config()
mongoose.set('strictQuery', true);
const { DB_HOST } = process.env;

const user = {
    email: "example@example.com",
    password: "examplepassword"
}

describe("test login controller", () => {
    beforeAll(() => {
        mongoose.connect(DB_HOST)
            .then(() => {
                app.listen(3000, () => {
                    console.log("Database connection successful")
                })
            })
            .catch(e => {
                console.log(e);
                process.exit(1)
            })
    });

    test("Response must have status 200", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(user);
        expect(res.statusCode).toBe(200);
    });

    test("Response must contain token", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(user);
        expect(res.body).toHaveProperty("token")
    })

    test("Response must contain user object, which consists of email, subscription, both type of string", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(user);
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toMatchObject(
            expect.objectContaining({
                email: expect.any(String),
                subscription: expect.any(String)
            })
        )
    })

    afterAll(() => {
        mongoose.disconnect()
    })
})