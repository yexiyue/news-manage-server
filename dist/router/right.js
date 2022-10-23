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
const right_js_1 = require("./../db/right.js");
const koa_router_1 = __importDefault(require("koa-router"));
const right_js_2 = require("../db/right.js");
const router = new koa_router_1.default();
exports.default = router;
router.get('/right', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, right_js_2.getRights)();
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
router.delete('/right/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, right_js_2.deleteRights)(+ctx.params.id);
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
router.get('/right/without', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, right_js_1.getRightsWithoutPage)();
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
router.patch('/right/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, right_js_1.updateRightPagePermission)(+ctx.params.id, ctx.request.body.pagepermission);
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
