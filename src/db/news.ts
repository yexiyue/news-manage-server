import { prisma } from "./right.js";
interface IData {
  article: string;
  auditState: number;
  author: string;
  categoryId: number;
  coverImage: string;
  region: string;
  roleId: number;
  title: string;
}

export const createNews = async (data: IData) => {
  try {
    return await prisma.new.create({
      data,
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const draftNews=async (author:string) => {
  try {
    return await prisma.new.findMany({
      where:{
        author,
        auditState:0
      },
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const deleteNews=async (id:number) => {
  try {
    return await prisma.new.delete({
      where:{
        id
      }
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const draftPreviewNews=async (id:number) => {
  try {
    return await prisma.new.findUnique({
      where:{
        id,
      },
      include:{
        Category:true
      }
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const updateDraftNews=async (id:number,data:Partial<IData>) => {
  try {
    return await prisma.new.update({
      where:{
        id,
      },
      include:{
        Category:true
      },
      data
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const auditList=async (author:string) => {
  try {
    return await prisma.new.findMany({
      where:{
        author,
        auditState:{
          not:0
        },
        publishState:{
          lt:2
        }
      },
      include:{
        Category:true
      }
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};


export const waitAuditList=async (roleId?:number,region?:string) => {
  try {
    return await prisma.new.findMany({
      where:{
        roleId,
        region,
        auditState:1,
        publishState:{
          lt:2
        }
      },
      include:{
        Category:true
      }
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const publishList=async (author:string,publishState:number) => {
  try {
    return await prisma.new.findMany({
      where:{
        author,
        publishState
      },
      include:{
        Category:true
      }
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const mostNewsView=async () => {
  try {
    return await prisma.new.findMany({
      where:{
        publishState:2
      },
      orderBy:{
        view:'desc'
      },
      include:{
        Category:true
      },
      take:7
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const mostNewsStar=async () => {
  try {
    return await prisma.new.findMany({
      where:{
        publishState:2
      },
      orderBy:{
        star:'desc'
      },
      include:{
        Category:true
      },
      take:7
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const touristNews=async () => {
  try {
    return await prisma.new.findMany({
      where:{
        publishState:2
      },
      orderBy:{
        view:'desc',
        
      },
      include:{
        Category:true
      }
    })
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};