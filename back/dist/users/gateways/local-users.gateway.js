"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUsersGateway = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
class LocalUsersGateway {
    fetchAll() {
        const data = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'src/users/data/users.json'), 'utf-8');
        const users = JSON.parse(data);
        return Promise.resolve(users);
    }
    fetchById(id) {
        const data = (0, fs_1.readFileSync)(path_1.default.join(__dirname, '../data/users.json'), 'utf-8');
        const users = JSON.parse(data);
        const user = users.find(p => p.id === id);
        if (!user)
            throw new common_1.NotFoundException('User not found.');
        return Promise.resolve(user);
    }
}
exports.LocalUsersGateway = LocalUsersGateway;
//# sourceMappingURL=local-users.gateway.js.map