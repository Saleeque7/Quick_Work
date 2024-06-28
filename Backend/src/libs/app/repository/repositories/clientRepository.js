import Schema from "../../database/index.js";
const { Client } = Schema
export const clientRepository = {
    createClient:async(data)=>{
        const userData = {
            name:data.name,
            email:data.email,
            password:data.password,
            phone:data.phone,
            job_role:data.job_role,
            isVerified:true
        }
        const client = await Client.create(userData)
        return client
    },
    
    findClientByEmail:async(email)=>{
        const client = await Client.findOne({email:email})
        return client
    },
   
}