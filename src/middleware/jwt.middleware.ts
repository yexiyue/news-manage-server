import { secret } from "./../router/login.js";
import { Middleware } from "koa";
import Jwt from "jsonwebtoken";
const whiteList = ["/login", "/tourist-news", "/tourist-detail/:id",'/'];
//匹配路径，自动替换：id
const matchPatch = (whiteList: string[], path: string) => {
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

export const JwtMiddleware: Middleware = async (ctx, next) => {
  if (matchPatch(whiteList, ctx.path)) {
    await next();
  } else {
    if (ctx.header.authorization) {
      const token = ctx.header.authorization;
      if (Jwt.verify(token, secret)) {
        await next();
      } else {
        ctx.status = 403;
        ctx.body = {
          meta: {
            msg: "no authorization",
          },
        };
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        meta: {
          msg: "no authorization",
        },
      };
    }
  }
};
