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
exports.TypeOrmCategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../entity/category.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TypeOrmCategoryRepository = class TypeOrmCategoryRepository {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async findAll() {
        return await this.categoriesRepository.find();
    }
    async findAllPages(page = 1, limit = 50) {
        const categories = await this.categoriesRepository.find();
        if (page <= 0)
            page = 1;
        if (limit <= 0 || limit >= 50)
            limit = 50;
        const offset = (page - 1) * limit;
        const total = categories.length;
        const paginationResult = {
            data: categories.slice(offset, offset + limit),
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
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category)
            return undefined;
        return category;
    }
    async create(input) {
        const category = await this.categoriesRepository.save(input);
        return category;
    }
    async update(id, input) {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category)
            return undefined;
        if (input.name !== undefined)
            category.name = input.name;
        await this.categoriesRepository.save(category);
        return category;
    }
    async remove(id) {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category)
            return undefined;
        await this.categoriesRepository.delete(id);
        return category;
    }
};
exports.TypeOrmCategoryRepository = TypeOrmCategoryRepository;
exports.TypeOrmCategoryRepository = TypeOrmCategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TypeOrmCategoryRepository);
//# sourceMappingURL=TypeOrmCategory.repository.js.map