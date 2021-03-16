//Schema建立好以后，需要我们载入这些数据库
const mongoose =require('mongoose')
const db='mongodb://localhost/mec'

const glob = require('glob')
const {resolve} = require('path')


//一次性引入所有的Schema文件
exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect=()=>{
    //链接数据库
    mongoose.connect(db)

    let maxConnectTimes=0

    //当数据库正常链接的时候才往下执行，要是不正常链接就不能往下执行
    return new Promise((resolve,reject)=>{

        //增加数据库监听事件
    mongoose.connection.on('disconnected',(err)=>{
        console.log('**************数据库断开');
        if (maxConnectTimes<=3){
            mongoose.connect(db)
        }else{
            reject(err);
            throw new Error('数据库出现问题，程序无法绑定，请人为处理。。。')
        }

    })

      //数据库错误
      mongoose.connection.on('error',(err)=>{
        console.log('**************数据库错误');
        if (maxConnectTimes<=3){
            mongoose.connect(db)
        }else{
            reject(err);
            throw new Error('数据库出现问题，程序无法绑定，请人为处理。。。')
        }
    })

    //数据库链接成功
    mongoose.connection.once('open',()=>{
        console.log('**************数据库链接成功');
        //不能重联，重联会死机
        // mongoose.connect(db)
        resolve()
    })

    })
    

    
}



