import { getRightsWithoutPage, updateRightPagePermission } from './../db/right.js';
import Router from "koa-router";
import { deleteRights, getRights } from "../db/right.js";

const router=new Router()

export default router

router.get('/right',async(ctx)=>{
    try {
        const res=await getRights()
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

router.delete('/right/:id',async(ctx)=>{
    try {
        const res=await deleteRights(+ctx.params.id)
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

router.get('/right/without',async(ctx)=>{
    try {
        const res=await getRightsWithoutPage()
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

router.patch('/right/:id',async(ctx)=>{
    try {
        const res=await updateRightPagePermission(+ctx.params.id,ctx.request.body.pagepermission)
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