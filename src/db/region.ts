import { prisma } from "./right.js";

export const getRegions=async()=>{
    try {
        return await prisma.region.findMany()
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}