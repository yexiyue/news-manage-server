import { updateRight } from './../db/role.js';
import { deleteRole, getRoles } from "../db/role.js";
import Router = require("koa-router");
const router=new Router()
export default router
router.get('/role',async(ctx)=>{
    try {
        const res=await getRoles()
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

router.delete('/role/:id',async(ctx)=>{
    try {
        const id=+ctx.params.id
        const res=await deleteRole(id)
        ctx.body={
            data:res,
            meta:{
                msg:'成功',
                status:201
            }
        }
    } catch (error) {
        console.log(error)
        Promise.reject(error)
    }
})

router.put('/role/:id',async(ctx)=>{
    try {
        const id=+ctx.params.id
        const {rights}=ctx.request.body
        const res=await updateRight(id,rights)
        ctx.body={
            data:res,
            meta:{
                msg:'成功',
                status:201
            }
        }
    } catch (error) {
        console.log(error)
        Promise.reject(error)
    }
})