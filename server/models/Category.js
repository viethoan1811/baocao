const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    listChild:[String],
    createAt: {
        type: Date,
        default: Date.now // Không có dấu ngoặc đơn ở đây
    }
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;