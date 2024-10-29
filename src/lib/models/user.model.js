import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    first_name:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User = mongoose.model("user",userSchema)

export default User;


