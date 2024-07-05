export default (dependencies) => {
const {use_case : {getJobPostUsecase}} = dependencies
    const getJobPostController = async(req,res) => {
        const {execute} = await getJobPostUsecase(dependencies)
        try {
            const heading  = req.query.activeHeading
            const userId = req.userId

            const result  = await execute(heading,userId)
            if(!result){
                res.status(401).json({message:"no jobdetails found"})
            }

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json("error in getJobPostController")
        }
    }
    return getJobPostController
}