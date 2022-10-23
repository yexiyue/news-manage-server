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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const Router = require("koa-router");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_js_1 = require("../db/user.js");
const router = new Router();
exports.default = router;
exports.secret = '123456';
router.post('/login', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = ctx.request.body;
        const res = yield (0, user_js_1.loginUser)(username);
        if (res == null) {
            ctx.status = 401;
            return ctx.body = {
                data: {},
                meta: {
                    msg: '该用户不存在',
                    status: 401
                }
            };
        }
        if (res.password !== password) {
            ctx.status = 402;
            return ctx.body = {
                data: {},
                meta: {
                    msg: '密码错误',
                    status: 402
                }
            };
        }
        if ((res === null || res === void 0 ? void 0 : res.password) === password && (res === null || res === void 0 ? void 0 : res.roleState)) {
            const token = jsonwebtoken_1.default.sign({ username, password }, exports.secret);
            ctx.body = {
                data: {
                    token
                },
                meta: {
                    msg: '成功',
                    status: 200
                }
            };
        }
        else {
            ctx.status = 403;
            ctx.body = {
                data: {},
                meta: {
                    msg: '该用户没有权限',
                    status: 403
                }
            };
        }
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/login', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = ctx.header.authorization;
        const { username, password } = jsonwebtoken_1.default.verify(token, exports.secret);
        const res = yield (0, user_js_1.userInfo)(username, password);
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
