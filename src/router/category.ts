import { getCategories, createCategory, deleteCategory, updateCategory, categoriesList } from './../db/category.js';
import Router = require("koa-router");
const router=new Router()
export default router

router.get('/category',async(ctx)=>{
    try {
        let res=await getCategories()
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

router.post('/category',async(ctx)=>{
    try {
        const value=ctx.request.body.value
        let res=await createCategory(value)
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

router.put('/category/:id',async(ctx)=>{
    try {
        const id=ctx.params.id
        const value=ctx.request.body.value
        let res=await updateCategory(+id,value)
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

router.delete('/category/:id',async(ctx)=>{
    try {
        const id=ctx.params.id
        let res=await deleteCategory(+id)
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

router.get('/category-list',async(ctx)=>{
    try {
        const {author}=ctx.query
        let res=await categoriesList(author as string)
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