import { prisma } from "./right.js";

export const getUsers=async()=>{
    try {
        return await prisma.user.findMany({
            include:{
                Role:true
            },
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const deleteUser=async(id:number)=>{
    try {
        return await prisma.user.delete({
            where:{
                id,
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const patchUser=async(id:number,roleState:boolean)=>{
    try {
        return await prisma.user.update({
            where:{
                id,
            },
            data:{
                roleState
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const postUser=async(data:{username:string,password:string,region:string,roleId:number})=>{
    try {
        return await prisma.user.create({
            data,
            include:{
                Role:true
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const putUser=async(id:number,data:{username:string,password:string,region:string,roleId:number})=>{
    try {
        return await prisma.user.update({
            where:{id},
            data,
            include:{
                Role:true
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const loginUser=async(username:string)=>{
    try {
        return await prisma.user.findFirst({
            where:{
                username
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const userInfo=async(username:string,password:string)=>{
    try {
        return await prisma.user.findFirst({
            where:{
                username,
                password
            },
            include:{
                Role:{
                    include:{
                        rights:{
                            where:{
                                OR:[
                                    {
                                        pagepermission:1
                                    },
                                    {
                                        routerpermission:1
                                    }
                                ]
                            },
                            select:{
                                key:true
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}


export const getUsersByRoleId=async(region:string)=>{
    try {
        return await prisma.user.findMany({
            where:{
                roleId:3,
                region
            },
            include:{
                Role:true
            },
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}