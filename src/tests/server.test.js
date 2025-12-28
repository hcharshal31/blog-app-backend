const request =  require("supertest");
const app = require("../app.js");

describe("Server health test", () => {
    it("should return server running message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty( "message", "Blog API is running...")
    })
})