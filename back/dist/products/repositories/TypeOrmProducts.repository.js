"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const ProductEntity_1 = require("../entities/ProductEntity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TypeOrmProductsRepository = class TypeOrmProductsRepository {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async findAll(name, orderBy, order = 'asc', categoryId) {
        let products = await this.productsRepository.find({ relations: { category: true } });
        if (!products)
            throw new common_1.NotFoundException('Products not found.');
        if (name) {
            const name_lower = name.toLowerCase();
            products = products.filter(p => p.name.toLowerCase().includes(name_lower));
        }
        ;
        if (orderBy && order === 'asc') {
            products = products.sort((p1, p2) => orderBy === 'name' ? p1[orderBy].localeCompare(p2[orderBy]) : p1[orderBy] - p2[orderBy]);
        }
        ;
        if (orderBy && order === 'desc') {
            products = products.sort((p1, p2) => orderBy === 'name' ? p2[orderBy].localeCompare(p1[orderBy]) : p2[orderBy] - p1[orderBy]);
        }
        ;
        if (categoryId) {
            products = products.filter(p => p.category?.id === categoryId);
        }
        ;
        return products;
    }
    async findAllPages(products, page, limit) {
        const offset = (page - 1) * limit;
        const total = products.length;
        const paginationResult = {
            data: products.slice(offset, offset + limit),
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
        return paginationResult;
    }
    async findById(id) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product)
            return undefined;
        return product;
    }
    async create(input) {
        const product = await this.productsRepository.save(input);
        return product;
    }
    async update(id, input) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product)
            return undefined;
        if (input.name !== undefined)
            product.name = input.name;
        if (input.price !== undefined)
            product.price = input.price;
        if (input.stock !== undefined)
            product.stock = input.stock;
        if (input.categoryId !== undefined)
            product.category.id = input.categoryId;
        await this.productsRepository.save(product);
        return product;
    }
    async updateStock(id, input) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product)
            return undefined;
        if (input.quantity !== undefined)
            product.stock -= input.quantity;
        await this.productsRepository.save(product);
        return product;
    }
    async remove(id) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product)
            return undefined;
        await this.productsRepository.delete(id);
        return product;
    }
};
exports.TypeOrmProductsRepository = TypeOrmProductsRepository;
exports.TypeOrmProductsRepository = TypeOrmProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(ProductEntity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TypeOrmProductsRepository);
//# sourceMappingURL=TypeOrmProducts.repository.js.map