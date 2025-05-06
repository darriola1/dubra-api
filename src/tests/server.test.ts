import request from "supertest";
import app from "../app/server";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(0, done); // Puerto aleatorio para test
});

afterAll((done) => {
  server.close(done);
});

describe("GET /", () => {
  it("debería responder con el mensaje de bienvenida", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("🚀 Dubra API funcionando correctamente");
  });
});