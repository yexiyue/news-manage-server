import { errorMiddleware } from './middleware/error.middleware.js';
import { routerList } from './router/index.js';
import koaBody from "koa-body";
import Koa from 'koa'
import KoaStatic from 'koa-static'
import {resolve} from 'path'
import { JwtMiddleware } from './middleware/jwt.middleware.js';
import koaCors from 'koa-cors';

const app=new Koa()

app.use(koaCors())
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:resolve(__dirname,'../public/image'),
        keepExtensions:true,
    }
}))
app.use(KoaStatic(resolve(__dirname,'../public')))
app.use(JwtMiddleware)
app.use(errorMiddleware)
routerList.forEach(router=>{
    app.use(router.routes())
})

app.listen(5143,()=>{
    console.log('server is running at http://localhost:5143')
})