"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRightPagePermission = exports.getRightsWithoutPage = exports.deleteRights = exports.getRights = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
//中间件
exports.prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const before = Date.now();
    const result = yield next(params);
    const after = Date.now();
    console.log(`${params.model}==> ${JSON.stringify(params.action)} time:${after - before}ms`);
    return result;
}));
exports.prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (params.model === 'New') {
        if (params.action === 'update') {
            params.args.data.updateTime = new Date();
            return yield next(params);
        }
    }
    const result = yield next(params);
    return result;
}));
const getRights = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield exports.prisma.right.findMany({
            where: {
                grade: 1,
                pagepermission: 1
            },
            include: {
                children: {
                    where: {
                        pagepermission: 1
                    }
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.getRights = getRights;
const deleteRights = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield exports.prisma.right.delete({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.deleteRights = deleteRights;
const getRightsWithoutPage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield exports.prisma.right.findMany({
            where: {
                grade: 1,
            },
            include: {
                children: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.getRightsWithoutPage = getRightsWithoutPage;
const updateRightPagePermission = (id, pagepermission) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield exports.prisma.right.update({
            where: {
                id: id
            },
            data: {
                pagepermission
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.updateRightPagePermission = updateRightPagePermission;
