//名字尽量和数据connection表的名字是一样的
const mongoose =require('mongoose')
const Schema =mongoose.Schema
let ObjectId=Schema.Types.ObjectId

//加盐加密引用的主件
const bcrypt=require('bcrypt')
const SALT_WORK_FACTOR=10

//创建UserSchema//Schema是以key-value形式Json格式的数据。
const userSchema =new Schema({
    UserId  :{type:ObjectId},
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},
// {
//     collation:'user'
// }//让mango表的名字是user

)//加盐：让用户简单的密码加一下东西不那么容易破解

//加盐加密处理，每次保存的时候，就触发一个匿名函数（先加盐，后加密）
userSchema.pre('save',function(next){
    //加盐，SALT_WORK_FACTOR加盐的位数
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        //加密
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password=hash
            next()
        })
    })
})

userSchema.methods={
    //_password客户端接收过来的密码，password数据库存的密码
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            //bcrypt加盐加密的组件
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err)resolve(isMatch)
                else reject(err)
            })
        })
    }
}


//发布模型
mongoose.model('User',userSchema)