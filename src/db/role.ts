import { prisma } from "./right.js";

export const getRoles=async()=>{
    try {
        return await prisma.role.findMany({
            include:{
                rights:{
                    select:{
                        key:true,
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const deleteRole=async(id:number)=>{
    try {
        const deleteRole=prisma.role.delete({
            where:{id},
        })
        const deleteUser=prisma.user.deleteMany({
            where:{
                roleId:id
            }
        })

        return await prisma.$transaction([deleteUser,deleteRole])
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export const updateRight=async(id:number,rights:string[])=>{
    try {
        const oldRole=await prisma.role.findUnique({
            where:{
                id
            },
            include:{
                rights:{
                    select:{
                        key:true
                    }
                }
            }
        })
        const oldKeys=oldRole?.rights
        await prisma.role.update({
            where:{
                id:id
            },
            data:{
                rights:{
                    disconnect:oldKeys
                }
            }
        })
        
        const keys=rights.map(i=>({key:i}))
        return await prisma.role.update({
            where:{
                id:id
            },
            data:{
                rights:{
                    connect:keys
                }
            }
        })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}