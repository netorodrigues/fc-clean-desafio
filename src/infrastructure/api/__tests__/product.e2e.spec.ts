import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "A product",
        type: "a",
        price: 50
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("A product");
    expect(response.body.price).toBe(50);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "john",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "First Product",
        type: "a",
        price: 10
      });

    expect(response.status).toBe(200);
    
    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Second Product",
        type: "b",
        price: 20
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const firstProduct = listResponse.body.products[0];
    expect(firstProduct.name).toBe("First Product");
    expect(firstProduct.price).toBe(10);
    const secondProduct = listResponse.body.products[1];
    expect(secondProduct.name).toBe("Second Product");
    expect(secondProduct.price).toBe(40);
  });
});
