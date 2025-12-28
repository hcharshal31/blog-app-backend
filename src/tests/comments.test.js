require("dotenv").config();
const request = require("supertest");
const app = require("../app.js");

describe("Comment owner authorization test", () => {
    it("Should not allow to update the comment to anyone other than the comment owner", async () => {

        // User A
        const randomNumberA = Math.floor(100 + Math.random() * 900);
        const emailA = `atest${randomNumberA}@example.com`;
        const passwordA = `password${randomNumberA}A`;

        await request(app).post("/auth/register").send({
            firstName: "User",
            lastName: "A",
            emailId: emailA,
            password: passwordA
        });

        const loginA = await request(app).post("/auth/login").send({
            emailId: emailA,
            password: passwordA
        });

        const jwtTokenA = loginA.body.jwtToken;

        // post creation by User A

        const postRes = await request(app).post("/posts").set("Authorization", `Bearer ${jwtTokenA}`).send({
            title: "Test Post",
            content: "This post is created for testing"
        });

        const postId = postRes.body.post._id;

        const commentRes = await request(app).post("/comments").set("Authorization", `Bearer ${jwtTokenA}`).send({
            content: "test comment",
            post_id: postId
        });

        // User B

        const randomNumberB = Math.floor(100 + Math.random() * 900);
        const emailB = `btest${randomNumberB}@example.com`;
        const passwordB = `password${randomNumberB}B`;

        await request(app).post("/auth/register").send({
            firstName: "User",
            lastName: "B",
            emailId: emailB,
            password: passwordB
        });

        const loginB = await request(app).post("/auth/login").send({
            emailId: emailB,
            password: passwordB
        });

        const jwtTokenB = loginB.body.jwtToken;

        const commentId = commentRes.body.comment._id;

        // Trying to update the comment of User A from User B
        const res = await request(app).put(`/comments/${commentId}`).set("Authorization", `Bearer ${jwtTokenB}`).send({
            content: "Hacked comment"
        });

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty("message");
    })
})