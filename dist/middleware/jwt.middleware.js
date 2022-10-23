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
exports.JwtMiddleware = void 0;
const login_js_1 = require("./../router/login.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const whiteList = ["/login", "/tourist-news", "/tourist-detail/:id", '/'];
//匹配路径，自动替换：id
const matchPatch = (whiteList, path) => {
    let flag = false;
    for (let item of whiteList) {
        const regExp = new RegExp("\\" + item.replace(/\/:id$/g, "\\/[\\d]+"), "g");
        flag = regExp.test(path);
        if (flag) {
            return true;
        }
    }
    return flag;
};
const JwtMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (matchPatch(whiteList, ctx.path)) {
        yield next();
    }
    else {
        if (ctx.header.authorization) {
            const token = ctx.header.authorization;
            if (jsonwebtoken_1.default.verify(token, login_js_1.secret)) {
                yield next();
            }
            else {
                ctx.status = 403;
                ctx.body = {
                    meta: {
                        msg: "no authorization",
                    },
                };
            }
        }
        else {
            ctx.status = 403;
            ctx.body = {
                meta: {
                    msg: "no authorization",
                },
            };
        }
    }
});
exports.JwtMiddleware = JwtMiddleware;
