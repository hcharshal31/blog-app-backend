const request = require("supertest");
const app = require("../app");

describe("User authentication API test", () => {
    it("should register a new user", async () => {
        const res = await request(app)
        .post("/auth/register")
        .send({
            firstName: "Test",
            lastName: "User",
            emailId: `test${Date.now()}@example.com`,
            password: "password123"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", );
    }
    // 10000  // We can tell jest explicitely that this test will take longer time to complete because by default the test have the 5 seconds time to complete.
    );

    it("Login and return the token", async () => {
        
        const randomNumber = Math.floor(100 + Math.random() * 900);
        const email = `test${randomNumber}@example.com`;
        const password = `password${randomNumber}`

        await request(app).post("/auth/register").send({
            firstName: "FirstUser",
            lastName: "LastUser",
            emailId: email,
            password: password
        });

        const res = await request(app).post("/auth/login").send({
            emailId: email,
            password
        })

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("jwtToken")
    })

});
