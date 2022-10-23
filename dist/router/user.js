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
const user_js_1 = require("./../db/user.js");
const Router = require("koa-router");
const router = new Router();
exports.default = router;
router.get('/user/:roleId/:region', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const region = ctx.params.region;
        const roleId = +ctx.params.roleId;
        let res = yield (0, user_js_1.getUsers)();
        if (roleId === 2) {
            res = yield (0, user_js_1.getUsersByRoleId)(region);
        }
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
router.patch('/user/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +ctx.params.id;
        const roleState = ctx.request.body.roleState;
        const res = yield (0, user_js_1.patchUser)(id, roleState);
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
router.delete('/user/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +ctx.params.id;
        const res = yield (0, user_js_1.deleteUser)(id);
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
router.post('/user', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = ctx.request.body;
        const res = yield (0, user_js_1.postUser)(data);
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
router.put('/user/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +ctx.params.id;
        const data = ctx.request.body;
        const res = yield (0, user_js_1.putUser)(id, data);
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
