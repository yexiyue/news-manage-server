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
const news_js_1 = require("./../db/news.js");
const Router = require("koa-router");
const router = new Router();
exports.default = router;
/* 创建新闻 */
router.post("/news", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = ctx.request.body;
        const file = ctx.request.files;
        const coverImage = (_a = file === null || file === void 0 ? void 0 : file.coverImage) === null || _a === void 0 ? void 0 : _a.newFilename;
        const res = yield (0, news_js_1.createNews)(Object.assign(Object.assign({}, data), { categoryId: +data.categoryId, roleId: +data.roleId, auditState: +data.auditState, coverImage }));
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
/* 草稿箱 */
router.post('/draft', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = ctx.request.body.author;
        const res = yield (0, news_js_1.draftNews)(data);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.delete('/draft/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        const res = yield (0, news_js_1.deleteNews)(+id);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/draft/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        const res = yield (0, news_js_1.draftPreviewNews)(+id);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.post("/draft/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = ctx.params.id;
        const data = ctx.request.body;
        const file = ctx.request.files;
        const coverImage = (_b = file === null || file === void 0 ? void 0 : file.coverImage) === null || _b === void 0 ? void 0 : _b.newFilename;
        const res = yield (0, news_js_1.updateDraftNews)(+id, Object.assign(Object.assign({}, data), { categoryId: +data.categoryId, auditState: +data.auditState, coverImage }));
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.post("/push_audit/:id", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        const res = yield (0, news_js_1.updateDraftNews)(+id, ctx.request.body);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/audit', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = ctx.query.author;
        const res = yield (0, news_js_1.auditList)(author);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/audit-list', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId, region } = ctx.query;
        let res = yield (0, news_js_1.waitAuditList)();
        if (roleId && region) {
            res = yield (0, news_js_1.waitAuditList)(+roleId, region);
        }
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/publish-list', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, publishState } = ctx.query;
        let res;
        if (author && publishState) {
            res = yield (0, news_js_1.publishList)(author, +publishState);
        }
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/most-view', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, news_js_1.mostNewsView)();
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/most-star', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, news_js_1.mostNewsStar)();
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/tourist-news', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, news_js_1.touristNews)();
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.get('/tourist-detail/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        const res = yield (0, news_js_1.draftPreviewNews)(+id);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
router.post('/tourist-detail/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = ctx.params.id;
        const res = yield (0, news_js_1.updateDraftNews)(+id, ctx.request.body);
        ctx.body = {
            data: res,
            meta: {
                msg: "ok",
                status: 200,
            },
        };
    }
    catch (error) {
        console.log(error);
        Promise.reject(error);
    }
}));
