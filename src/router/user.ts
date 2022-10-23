import { deleteUser, getUsers, patchUser, postUser, putUser, getUsersByRoleId } from './../db/user.js';
import Router = require("koa-router");
const router=new Router()
export default router

router.get('/user/:roleId/:region',async(ctx)=>{
    try {
        const region=ctx.params.region
        const roleId=+ctx.params.roleId
        let res=await getUsers()
        if(roleId===2){
            res=await getUsersByRoleId(region)
        }
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

router.patch('/user/:id',async(ctx)=>{
    try {
        const id=+ctx.params.id
        const roleState=ctx.request.body.roleState
        const res=await patchUser(id,roleState)
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

router.delete('/user/:id',async(ctx)=>{
    try {
        const id=+ctx.params.id
        const res=await deleteUser(id)
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

router.post('/user',async(ctx)=>{
    try {
        const data=ctx.request.body
        const res=await postUser(data)
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

router.put('/user/:id',async(ctx)=>{
    try {
        const id=+ctx.params.id
        const data=ctx.request.body
        const res=await putUser(id,data)
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