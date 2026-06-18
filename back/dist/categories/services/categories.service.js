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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repository_1 = require("../repositories/categories.repository");
const products_service_1 = require("../../products/services/products.service");
let CategoriesService = class CategoriesService {
    categoriesRepository;
    productsService;
    constructor(categoriesRepository, productsService) {
        this.categoriesRepository = categoriesRepository;
        this.productsService = productsService;
    }
    async findAll() {
        return await this.categoriesRepository.findAll();
    }
    async findAllPages(page, limit) {
        const paginationResult = await this.categoriesRepository.findAllPages(page, limit);
        if (!paginationResult)
            throw new common_1.NotFoundException('Categories not found.');
        return paginationResult;
    }
    async findBy(id) {
        const category = await this.categoriesRepository.findById(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found.');
        return category;
    }
    async findProducts(id) {
        this.findBy(id);
        const products = await this.productsService.findAll(undefined, undefined, undefined, id);
        if (!products)
            throw new common_1.NotFoundException('Products not found.');
        return products;
    }
    async create(body) {
        return await this.categoriesRepository.create(body);
    }
    async update(id, input) {
        const category = await this.categoriesRepository.update(id, input);
        if (!category)
            throw new common_1.NotFoundException('Category not found.');
        return category;
    }
    async remove(id) {
        const category = await this.categoriesRepository.remove(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found.');
        const products = await this.productsService.findAll(undefined, undefined, undefined, id);
        if (products)
            throw new common_1.ConflictException('Cannot delete category with associated products.');
        await this.categoriesRepository.remove(id);
        return category;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_repository_1.CATEGORIES_REPOSITORY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __metadata("design:paramtypes", [Object, products_service_1.ProductsService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map