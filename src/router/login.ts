import Router = require("koa-router");
import Jwt from "jsonwebtoken";
import { loginUser, userInfo } from "../db/user.js";
const router=new Router()
export default router
export const secret='123456'
router.post('/login',async(ctx)=>{
    try {
        const {username,password}=ctx.request.body
        const res=await loginUser(username)
        if(res==null){
            ctx.status=401
            return ctx.body={
                data:{},
                meta:{
                    msg:'该用户不存在',
                    status:401
                }
            }
        }
        if(res.password!==password){
            ctx.status=402
            return ctx.body={
                data:{},
                meta:{
                    msg:'密码错误',
                    status:402
                }
            }
        }
        if(res?.password===password && res?.roleState){
            const token=Jwt.sign({username,password},secret)
            ctx.body={
                data:{
                    token
                },
                meta:{
                    msg:'成功',
                    status:200
                }
            }
        }else{
            ctx.status=403
            ctx.body={
                data:{},
                meta:{
                    msg:'该用户没有权限',
                    status:403
                }
            }
        }
    } catch (error) {
        console.log(error)
        Promise.reject(error)
    }
})


router.get('/login',async(ctx)=>{
    try {
        const token=ctx.header.authorization!
        const {username,password}=Jwt.verify(token,secret) as any
        const res=await userInfo(username,password)
        ctx.body={
            data:res,
            meta:{
                msg:'成功',
                status:200
            }
        }
    } catch (error) {
        console.log(error)
        Promise.reject(error)
    }
})