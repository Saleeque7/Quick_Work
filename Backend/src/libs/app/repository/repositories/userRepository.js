import Schema from '../../database/index.js'

const { User, JobPost } = Schema
const repository = {
    createUser: async (data) => {

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            job_role: data.job_role,
            isVerified: true
        }

        const user = await User.create(userData)
        return user
    },
    findUserByEmail: async (email) => {
        const user = await User.findOne({ email: email })
        return user
    },
    findUSerByIdAndUpdate: async (userId, userInfo) => {
        try {

            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }
            user.name = userInfo.name
            user.email = userInfo.email
            user.phone = userInfo.phone
            user.dateOfBirth = userInfo.dateOfBirth
            user.State = userInfo.place
            user.profile = userInfo.image

            const updatedUser = await user.save();
            console.log(updatedUser, "ghjhghh");
            return updatedUser
        } catch (error) {
            console.error("error in userRepository :", error);
        }
    },
    findUserAndaddInfo: async (data, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }
            user.jobTitle = data.jobTitle
            user.overview = data.Overview
            user.skills = data.skills
            user.hourlyRate = data.rate

            const updateddata = await user.save();
            return updateddata
        } catch (error) {
            console.error("error in userRepository :", error);

        }

    },
    saveExperienceInfo: async (userId, data) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error("user not Found")
            }

            if (data && user) {
                user.experiences.push({
                    jobTitle: data.jobTitleExp,
                    company: data.companyExp,
                    duration: data.duration,
                    overview: data.expOverview,
                });
            }
            user.isUserProfile = true
            const updateddata = await user.save();
            return updateddata
        } catch (error) {
            console.error("error in userRepository :", error);

        }

    },
    changeisUserprofile: async (userId) => {
        const user = await User.findById(userId)
        user.isUserProfile = true
        const updateddata = await user.save();
        return updateddata
    },
    getjobcards: async () => {
        try {
            const res = await JobPost.find().sort({ createdAt: -1 })
            return res
        } catch (error) {
            console.error("error in userRepository :", error);

        }
    },
    getMatchingjobcards: async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
              throw new Error("User not found");
            }
        
            const matchedJobs = await JobPost.find({
              skills: { $in: user.skills }
            })
        console.log(matchedJobs ,"wtttt");
            return matchedJobs;
        } catch (error) {
            console.error("error in userRepository :", error);

        }
    }

}

export default repository