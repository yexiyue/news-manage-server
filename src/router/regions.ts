import { getRegions } from './../db/region.js';
import Router = require("koa-router");
const router=new Router()
export default router

router.get('/region',async(ctx)=>{
    try {
        const res=await getRegions()
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