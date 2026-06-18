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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("../repositories/products.repository");
const categories_service_1 = require("../../categories/services/categories.service");
let ProductsService = class ProductsService {
    productsRepository;
    categoriesService;
    constructor(productsRepository, categoriesService) {
        this.productsRepository = productsRepository;
        this.categoriesService = categoriesService;
    }
    async findAll(name, ordenarPor, orden, categoryId) {
        const products = await this.productsRepository.findAll(name, ordenarPor, orden, categoryId);
        if (!products)
            throw new common_1.NotFoundException('Products not found.');
        return products;
    }
    async findAllPages(products, pagination) {
        const paginationResult = await this.productsRepository.findAllPages(products, pagination.page, pagination.limit);
        if (!paginationResult)
            throw new common_1.NotFoundException('Products not found.');
        return paginationResult;
    }
    async findOne(id) {
        const product = await this.productsRepository.findById(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async create(input) {
        if (input.categoryId) {
            const category = await this.categoriesService.findBy(input.categoryId);
            if (!category)
                throw new common_1.NotFoundException('Category not found.');
            const product = {
                name: input.name,
                price: input.price,
                stock: input.stock,
                category
            };
            return this.productsRepository.create(product);
        }
        return this.productsRepository.create(input);
    }
    async update(id, input) {
        if (input.categoryId) {
            const category = await this.categoriesService.findBy(input.categoryId);
            if (!category)
                throw new common_1.NotFoundException('Category not found');
        }
        const product = await this.productsRepository.update(id, input);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async updateStock(id, input) {
        const product = await this.findOne(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found.');
        if (input.quantity > product.stock)
            throw new common_1.BadRequestException('Stock insuficiente.');
        await this.productsRepository.updateStock(id, input);
        return product;
    }
    async remove(id) {
        const product = await this.productsRepository.remove(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(products_repository_1.PRODUCTS_REPOSITORY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => categories_service_1.CategoriesService))),
    __metadata("design:paramtypes", [Object, categories_service_1.CategoriesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map