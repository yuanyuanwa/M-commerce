const Router =require('koa-router')
const mongoose=require('mongoose')

let router=new Router()
router.get('/',async(cxt)=>{
    cxt.body='这是用户操作首页'
})
router.post('/register',async(ctx)=>{
    //body把post数据形成一个对象传递过来，就得到了前端传递过来的数据
    // console.log(ctx.request.body);
    //后端传数据给前端，一般要做数据库的插入操作和判断操作都要做好
    // ctx.body=ctx.request.body;//把得到的数据传给前端

    const User=mongoose.model('User')
    //ctx.request.body就是前端的data
    let newUser=new User(ctx.request.body)
    //异步操作
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch((error)=>{    
        ctx.body={
            code:500,
            message:error
        }//传到前端就是response.data里的数据

    })//键值不能重复，用户名重复时就可能报错

    
})
router.get('/register',async(cxt)=>{   
    cxt.body='这是用户注册接口'
})
router.get('/login',async(cxt)=>{   
    cxt.body='这是用户登陆接口'
})
router.post('/login',async(cxt)=>{
    let loginUser=cxt.request.body;
    let userName=loginUser.userName
    let password=loginUser.password

    //查找用户名是否存在
    //引入User中的model
    const User=mongoose.model('User')

    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result);
        if(result){
            let newUser=new User()
            //comparePassword自己写的方法
            await newUser.comparePassword(password,result.password)
            .then(isMatch=>{
                cxt.body={
                    code:200,message:isMatch //密码正确就是true，密码错误就是false
                }
            })
            .catch(error=>{
                console.log(error);
                cxt.body={code:200,message:'用户名不存在'}
            })
        }else{
            cxt.body={code:200,message:'用户名不存在'}
        }
    }).catch((error)=>{
        console.log(error);
        cxt.body={code:500,message:error}
    })
})

// router.post('./login',async(cxt)=>{
//     let loginUser=cxt.request.body;
//     console.log(cxt.request.body);
//     let userName=loginUser.userName
//     let password=loginUser.password

//     //查找用户名是否存在
//     //引入User中的model
//     const User=mongoose.model('User')

//     await User.findOne({userName:userName}).exec().then(async(result)=>{
//         console.log(result);
//         if(result){
//             let newUser=new User()
//             //comparePassword自己写的方法
//             await newUser.comparePassword(password,result.password)
//             .then(isMatch=>{
//                 cxt.body={
//                     code:200,message:isMatch
//                 }
//             })
//             .catch(error=>{
//                 console.log(error);
//                 cxt.body={code:200,message:'用户名不存在'}
//             })
//         }else{
//             cxt.body={code:200,message:'用户名不存在'}
//         }
//     }).catch((error)=>{
//         console.log(error);
//         cxt.body={code:500,message:error}
//     })
// })

router.get('/rr',async(cxt)=>{
    cxt.body='222'
})

module.exports=router