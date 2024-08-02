export default (dependencies) => {
    const {use_case : { alljobproposalsUsecase }} = dependencies
    const alljobproposalsController = async(req,res) =>{
        try {
            const user = req.userId
            const { searchQuery = '' } = req.query; 
            const { execute } = await alljobproposalsUsecase(dependencies)
            const result = await execute(user, searchQuery)
            if(!result){
                return res.status(401).json({message:"error in fetching proposals"})
            }

            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in alljobproposalsController");
            return res.status(500).json(error)
        }
    }
    return alljobproposalsController
}