import Router from "koa-router";
import rightRouter from './right.js'
import roleRouter from './role.js'
import userRouter from './user.js'
import regionsRouter from './regions.js'
import loginRouter from './login.js'
import categoryRouter from './category.js'
import newsRouter from './news.js'
export const router=new Router()

router.get('/',(ctx)=>{
    ctx.redirect('/index.html')
})

export const routerList=[
    router,
    rightRouter,
    roleRouter,
    userRouter,
    regionsRouter,
    loginRouter,
    categoryRouter,
    newsRouter
]