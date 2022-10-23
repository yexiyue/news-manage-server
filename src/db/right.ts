import {PrismaClient} from '@prisma/client'

export const prisma=new PrismaClient()

//中间件
prisma.$use(async(params,next)=>{
    const before=Date.now()
    const result=await next(params)
    const after=Date.now()
    console.log(`${params.model}==> ${JSON.stringify(params.action)} time:${after-before}ms`)
    return result
})

prisma.$use(async(params,next)=>{
    if(params.model==='New'){
        if(params.action==='update'){
            params.args.data.updateTime=new Date()
            return await next(params)
        }
    }
    const result=await next(params)
    return result
})

export const getRights=async()=>{
    try {
        return await prisma.right.findMany({
            where:{
                grade:1,
                pagepermission:1
            },
            include:{
                children:{
                    where:{
                        pagepermission:1
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const deleteRights=async(id:number)=>{
    try {
        return await prisma.right.delete({
            where:{
                id:id
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const getRightsWithoutPage=async()=>{
    try {
        return await prisma.right.findMany({
            where:{
                grade:1,
            },
            include:{
                children:true
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const updateRightPagePermission=async(id:number,pagepermission:number)=>{
    try {
        return await prisma.right.update({
            where:{
                id:id
            },
            data:{
                pagepermission
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

