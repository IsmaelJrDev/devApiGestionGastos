const { default: mongoose } = require("mongoose");
const moongose =  require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true,
        index:true,
    },
});

module.exports =  mongoose.model("Category",categorySchema)






