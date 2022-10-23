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
exports.categoriesList = exports.createCategory = exports.updateCategory = exports.deleteCategory = exports.getCategories = void 0;
const right_js_1 = require("./right.js");
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.category.findMany();
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.getCategories = getCategories;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.category.delete({
            where: {
                id
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.deleteCategory = deleteCategory;
const updateCategory = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.category.update({
            where: {
                id
            },
            data: {
                title: value,
                value
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.updateCategory = updateCategory;
const createCategory = (value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.category.create({
            data: {
                title: value,
                value
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.createCategory = createCategory;
const categoriesList = (author) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield right_js_1.prisma.category.findMany();
        const newsCount = yield right_js_1.prisma.new.groupBy({
            by: ['categoryId'],
            where: {
                publishState: 2,
                author
            },
            _count: true,
            orderBy: {
                categoryId: 'asc'
            }
        });
        return category.map((item) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, item), { _count: (_b = (_a = newsCount.find(i => i.categoryId === item.id)) === null || _a === void 0 ? void 0 : _a._count) !== null && _b !== void 0 ? _b : 0 }));
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.categoriesList = categoriesList;
