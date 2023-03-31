import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const firstProduct = new Product("1","A product",30);
        const firstOutput = {"id": "1", "name": "A product", "price": 30};

        const secondProduct = new Product("2", "Another Product", 20);
        const secondOutput = {"id": "2", "name": "Another Product", "price": 20};
        

        await productRepository.create(firstProduct);
        await productRepository.create(secondProduct);


        const result = await usecase.execute({});


        expect(result).toEqual({"products": [firstOutput, secondOutput]});
    });
});
