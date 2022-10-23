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
const category_js_1 = require("./../db/category.js");
const Router = require("koa-router");
const router = new Router();
exports.default = router;
router.get('/category', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = yield (0, category_js_1.getCategories)();
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 200
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.post('/category', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = ctx.request.body.value;
        let res = yield (0, category_js_1.createCategory)(value);
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 200
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.put('/category/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        const value = ctx.request.body.value;
        let res = yield (0, category_js_1.updateCategory)(+id, value);
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 200
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.delete('/category/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        let res = yield (0, category_js_1.deleteCategory)(+id);
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 200
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/category-list', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author } = ctx.query;
        let res = yield (0, category_js_1.categoriesList)(author);
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 200
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
