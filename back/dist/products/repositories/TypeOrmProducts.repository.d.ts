import { PaginatedResult } from "../../shared/paginacion.type";
import { UpdateStock } from "../product.types";
import { ProductsRepository } from "./products.repository";
import { ProductEntity } from "../entities/ProductEntity";
import { Repository } from "typeorm";
import { CreateProduct } from "../dto/create-Product.dto";
import { UpdateProduct } from "../dto/update-product.dto";
export declare class TypeOrmProductsRepository implements ProductsRepository {
    private readonly productsRepository;
    constructor(productsRepository: Repository<ProductEntity>);
    findAll(name?: string, orderBy?: string, order?: string, categoryId?: number): Promise<ProductEntity[]>;
    findAllPages(products: ProductEntity[], page: number, limit: number): Promise<PaginatedResult<ProductEntity>>;
    findById(id: number): Promise<ProductEntity | undefined>;
    create(input: CreateProduct): Promise<ProductEntity>;
    update(id: number, input: UpdateProduct): Promise<ProductEntity | undefined>;
    updateStock(id: number, input: UpdateStock): Promise<ProductEntity | undefined>;
    remove(id: number): Promise<ProductEntity | undefined>;
}
