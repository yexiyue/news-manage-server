import { auditList, createNews, deleteNews, draftNews, draftPreviewNews, mostNewsStar, mostNewsView, publishList, touristNews, updateDraftNews, waitAuditList } from "./../db/news.js";
import Router = require("koa-router");
const router = new Router();
export default router;
/* 创建新闻 */
router.post("/news", async (ctx) => {
  try {
    const data = ctx.request.body;
    const file = ctx.request.files;
    const coverImage = (file?.coverImage as any)?.newFilename;
    const res = await createNews({
      ...data,
      categoryId: +data.categoryId,
      roleId: +data.roleId,
      auditState: +data.auditState,
      coverImage,
    });
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
});

/* 草稿箱 */
router.post('/draft',async (ctx) => {
  try {
    const data = ctx.request.body.author;
    const res = await draftNews(data)
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
})

router.delete('/draft/:id',async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await deleteNews(+id)
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
})

router.get('/draft/:id',async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await draftPreviewNews(+id)
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
})


router.post("/draft/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    const data = ctx.request.body;
    const file = ctx.request.files;
    const coverImage = (file?.coverImage as any)?.newFilename;
    const res = await updateDraftNews(+id,{
      ...data,
      categoryId: +data.categoryId,
      auditState: +data.auditState,
      coverImage,
    });
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
});

router.post("/push_audit/:id", async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await updateDraftNews(+id,ctx.request.body);
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
});


router.get('/audit',async(ctx)=>{
  try {
    const author= ctx.query.author as string;
    const res = await auditList(author)
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)

router.get('/audit-list',async(ctx)=>{
  try {
    const {roleId,region}=ctx.query
    let res =await waitAuditList()
    if(roleId && region){
      res=await waitAuditList(+roleId,region as string)
    }
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)

router.get('/publish-list',async(ctx)=>{
  try {
    const {author,publishState}=ctx.query
    let res
    if(author && publishState){
      res=await publishList(author as string,+publishState)
    }
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)


router.get('/most-view',async(ctx)=>{
  try {
    const res=await mostNewsView()
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)

router.get('/most-star',async(ctx)=>{
  try {
    const res=await mostNewsStar()
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)

router.get('/tourist-news',async(ctx)=>{
  try {
    const res=await touristNews()
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)

router.get('/tourist-detail/:id',async(ctx)=>{
  try {
    const id=ctx.params.id
    const res=await draftPreviewNews(+id)
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)

router.post('/tourist-detail/:id',async(ctx)=>{
  try {
    const id = ctx.params.id;
    const res = await updateDraftNews(+id,ctx.request.body);
    ctx.body = {
      data: res,
      meta: {
        msg: "ok",
        status: 200,
      },
    };
  }catch (error) {
      console.log(error);
      Promise.reject(error);
    }
  }
)