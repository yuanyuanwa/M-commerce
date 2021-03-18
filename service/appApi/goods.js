const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

//批量插入商品详情数据到MangoDB中
router.get('/insertAllGoodsInfo', async (ctx) => {
  //./newGoods.json是相对于index.js的路径
  fs.readFile('./newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      console.log(value);
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount);
      }).catch(error => {
        console.log(MediaStreanErrorEvent);
      })
    })
  })
  ctx.body = '开始导入数据'
})

//商品大类Schema建立并导入数据库中
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('插入成功' + saveCount);
      }).catch(error => {
        console.log('插入失败', error);
      })
    })
  })
  ctx.body = '开始导入数据'
})

//商品子类Schema建立并导入数据库中
router.get('/insertCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategorySub = new Category(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('插入成功' + saveCount);
      }).catch(error => {
        console.log('插入失败', error);
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 获取商品详情页
// router.post('/getDetailGoodsInfo',async(ctx)=>{
//     console.log(ctx.request.body);
//     let goodsId=ctx.request.body.goodsId
//     const Goods=mongoose.model('Goods')
//     await Goods.findOne({ID:goodsId}).exec()
//     .then(async(result)=>{
//         ctx.body={code:200,message:result}
//     })
//     .catch(error=>{
//         console.log(error);
//         ctx.body={code:500,message:error}
//     })
// })
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({
      ID: goodsId
    }).exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }

})

router.get('/getDetailGoodsInfo', async (ctx) => {
  ctx.body = 'yuanyuan'
})

// 读取大类数据的接口
router.get('/getCategoryList', async (cxt) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    cxt.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    cxt.body = {
      code: 500,
      message: error
    }
  }
})

// 读取小类数据的接口
router.post('/getCategorySubList', async (cxt) => {
  try {
    let categoryId = cxt.request.body.categoryId
    // let categoryId=1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec()
    cxt.body = {
      code: '200',
      message: result
    }
  } catch (error) {
    cxt.body = {
      code: 500,
      message: error
    }
  }
})

//根据小类别获取商品信息列表 and 商品列表的分页服务制作
router.post('/getGoodsListByCategorySubID', async (cxt) => {
  try {
    //获得子类别的ID
    let categorySubId = cxt.request.body.categorySubId
    //获取当前的页数
    let page = cxt.request.body.page
    //每页显示数量
    const num = 10
    //每页开始的位置
    let start = (page - 1) * num
    //let categoryId=cxt.request.body.categoryId
    // let categorySubId='2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    //skip()就是要跳过的数量,limit每页显示的数量
    let result = await Goods.find({
      SUB_ID: categorySubId
    }).skip(start).limit(num).exec()
    cxt.body = {
      code: '200',
      message: result
    }
  } catch (error) {
    cxt.body = {
      code: 500,
      message: error
    }
  }
})

module.exports = router
