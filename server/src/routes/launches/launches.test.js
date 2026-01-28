const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
describe("Api tests", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /v1/launches", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /v1/launches", () => {
    const completeLaunchData = {
      mission: "USS enterpirse",
      rocket: "NCC 150",
      destination: "Kepler-1652 b",
      launchDate: "January 4,2028",
    };
    const launchDataWithoutDate = {
      mission: "USS enterpirse",
      rocket: "NCC 150",
      destination: "Kepler-1652 b",
    };
    const launchDataWithInvalidDate = {
      mission: "USS enterpirse",
      rocket: "NCC 150",
      destination: "Kepler-1652 b",
      launchDate: "xxot",
    };

    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch Date",
      });
    });
  });

  describe("Test Get / planets", () => {
    test("it should repond with 200 success ", async () => {
      const reponse = await request(app)
        .get("/v1/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
