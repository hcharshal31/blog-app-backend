require("dotenv").config();

const request = require("supertest");
const app = require("../app.js");

describe("Post API authorization test", () => {
    it("Should not allow to create post without the token", async ()=> {
        const res = await request(app).post("/posts").send({
            title: "Unauthorized Post",
            content: "This should not be created",
            tags: ["test"]
        })

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message");
    })

    it("Should allow to create a post to logged in user", async () => {

        const randomNumber = Math.floor(100 + Math.random() * 900);
        const email = `test${randomNumber}@example.com`;
        const password = `password${randomNumber}`

        await request(app).post("/auth/register").send({
            firstName: "Post",
            lastName: "Creator",
            emailId: email,
            password: password
        });

        const loginRes = await request(app).post("/auth/login").send({
            emailId: email,
            password
        });

        const { jwtToken } = loginRes.body;

        const res = await request(app).post("/posts").set("Authorization", `Bearer ${jwtToken}`).send({
            title: "Authorized Post",
            content: "This post should be created",
            tags: ["auth", "test"]
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("post");
    })
})