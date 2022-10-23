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
const role_js_1 = require("./../db/role.js");
const role_js_2 = require("../db/role.js");
const Router = require("koa-router");
const router = new Router();
exports.default = router;
router.get('/role', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, role_js_2.getRoles)();
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
router.delete('/role/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +ctx.params.id;
        const res = yield (0, role_js_2.deleteRole)(id);
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 201
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.put('/role/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +ctx.params.id;
        const { rights } = ctx.request.body;
        const res = yield (0, role_js_1.updateRight)(id, rights);
        ctx.body = {
            data: res,
            meta: {
                msg: '成功',
                status: 201
            }
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
