"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const index_js_1 = require("./router/index.js");
const koa_body_1 = __importDefault(require("koa-body"));
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = require("path");
const jwt_middleware_js_1 = require("./middleware/jwt.middleware.js");
const koa_cors_1 = __importDefault(require("koa-cors"));
const app = new koa_1.default();
app.use((0, koa_cors_1.default)());
app.use((0, koa_body_1.default)({
    multipart: true,
    formidable: {
        uploadDir: (0, path_1.resolve)(__dirname, '../public/image'),
        keepExtensions: true,
    }
}));
app.use((0, koa_static_1.default)((0, path_1.resolve)(__dirname, '../public')));
app.use(jwt_middleware_js_1.JwtMiddleware);
app.use(error_middleware_js_1.errorMiddleware);
index_js_1.routerList.forEach(router => {
    app.use(router.routes());
});
app.listen(5143, () => {
    console.log('server is running at http://localhost:5143');
});
