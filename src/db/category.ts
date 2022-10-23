import { prisma } from "./right.js";

export const getCategories=async()=>{
    try {
        return await prisma.category.findMany()
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const deleteCategory=async(id:number)=>{
    try {
        return await prisma.category.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const updateCategory=async(id:number,value:string)=>{
    try {
        return await prisma.category.update({
            where:{
                id
            },
            data:{
                title:value,
                value
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const createCategory=async(value:string)=>{
    try {
        return await prisma.category.create({
            data:{
                title:value,
                value
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const categoriesList=async(author?:string)=>{
    try {
        const category=await prisma.category.findMany()
        const newsCount=await prisma.new.groupBy({
            by:['categoryId'],
            where:{
                publishState:2,
                author
            },
            _count:true,
            orderBy:{
                categoryId:'asc'
            }
        })
        return category.map((item)=>({
            ...item,
            _count:newsCount.find(i=>i.categoryId===item.id)?._count ?? 0
        }))
        
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}