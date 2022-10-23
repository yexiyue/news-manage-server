import { Middleware } from "koa";

export const errorMiddleware:Middleware=async(ctx,next)=>{
    try {
        await next()
    } catch (error) {
        ctx.status=500
        ctx.body={
            error:error+'',
            meta:{
                msg:'服务器发生错误',
                status:500
            }
        }
    }
}