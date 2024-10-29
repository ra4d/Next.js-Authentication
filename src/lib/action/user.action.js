import User from "../models/user.model";

import connect from "../mongodb/mongoose";

export const createOrUpdate = async(
    id,
    first_name,
    last_name,
    image_url,
    email_addresses,
    username
) => {
    try {
        await connect();
        const user = await User.findByIdAndUpdate({
            clerkId:id
        },{
            $set:{
                first_name:first_name,
                lastName:last_name,
                avatar:image_url,
                email:email_addresses,
                username:username,
            }
        },{new:true , upsert:true})
        return user;
    } catch (error) {
        console.log("Error creating or updating user:",error);
        
    }
}

export const deleteUser = async(id) => {
    try{
        await User.findByIdAndDelete({clerkId:id})
    }catch(error){
        console.log("Error deleting user:",error);
    }
}



