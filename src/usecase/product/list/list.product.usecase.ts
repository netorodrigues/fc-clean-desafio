import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductsDTO } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDTO): Promise<OutputListProductsDTO> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(productList: ProductInterface[]): OutputListProductsDTO {
    return {
      products: productList.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price
      })),
    };
  }
}
