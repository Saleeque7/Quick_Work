import Schema from "../../database/index.js";
const { Client , User , JobPost } = Schema
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
    browseUsers:async()=>{
        try {       
            const users = await User.find().sort({createdAt:-1})
            return users
        } catch (error) {
          console.error("error in clientrepo")  
        }
    },
     createJobrequest : async (data, clientId) => {
        try {
          const jobPostData = {
            clientId: clientId,
            projectTerm:data.selectedItem,
            jobRole: data.jobRole,
            budgetType: data.budgetType,
            skills: data.skills,
            description: data.overviewInput,
          };
      
          if (data.budgetType === "fixed") {
            jobPostData.budget = data.budget;
          } else if (data.budgetType === "hourly") {
            jobPostData.wageRangeMin = data.wageRangeMin;
            jobPostData.wageRangeMax = data.wageRangeMax;
            jobPostData.selectHour = data.selecthour;
          }
          const jobPost = new JobPost(jobPostData);
          await jobPost.save();
      

          await Client.findByIdAndUpdate(
            clientId,
            { $push: { jobPosts: jobPost._id } },
            { new: true }
          );
      
          return jobPost;
        } catch (error) {
          console.error('Error creating job post:', error);
          throw error;
        }
      }
         
   
}