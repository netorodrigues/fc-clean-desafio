import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const firstProduct = ProductFactory.create(
    "a",
    "Product A",
    10
);

const secondProduct = ProductFactory.create(
  "b",
  "Product B",
  20
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([firstProduct, secondProduct])),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(firstProduct.id);
    expect(output.products[0].name).toBe(firstProduct.name);
    expect(output.products[0].price).toBe(firstProduct.price);
    expect(output.products[1].id).toBe(secondProduct.id);
    expect(output.products[1].name).toBe(secondProduct.name);
    expect(output.products[1].price).toBe(secondProduct.price);
  });
});
