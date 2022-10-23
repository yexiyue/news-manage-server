"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerList = exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const right_js_1 = __importDefault(require("./right.js"));
const role_js_1 = __importDefault(require("./role.js"));
const user_js_1 = __importDefault(require("./user.js"));
const regions_js_1 = __importDefault(require("./regions.js"));
const login_js_1 = __importDefault(require("./login.js"));
const category_js_1 = __importDefault(require("./category.js"));
const news_js_1 = __importDefault(require("./news.js"));
exports.router = new koa_router_1.default();
exports.router.get('/', (ctx) => {
    ctx.redirect('/index.html');
});
exports.routerList = [
    exports.router,
    right_js_1.default,
    role_js_1.default,
    user_js_1.default,
    regions_js_1.default,
    login_js_1.default,
    category_js_1.default,
    news_js_1.default
];
