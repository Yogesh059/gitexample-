const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
    inStock:{
        type:Boolean,
        required:true,
        default:true,
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        // required:true,
    },
    categories:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        default:[]
    },
    color:{
        type:Array,
        default:["black","yellow","pink"],
    },
    price:{
        type:Number,
        required:true,
    }
    
},{timestamps:true});

module.exports=mongoose.model("Product",ProductSchema);