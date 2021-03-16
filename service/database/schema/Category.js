const mongoose=require('mongoose')
const Schema =mongoose.Schema

//和category.json文件里面的键对应
const categorySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:{type:String},
    IMAGE:{type:String},
    TYPE:{type:Number},
    SORT:{type:Number},
    COMMENTS:{type:String}
})
//建立模型
mongoose.model('Category',categorySchema)