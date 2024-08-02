export default (dependencies) => {
    const {use_case : { acceptedContractuseCase }} = dependencies
    const acceptedContractController  = async (req,res) => {
        try {
            const user = req.userId
            const { searchQuery = '' } = req.query; 
            const { execute } = await acceptedContractuseCase(dependencies)
            const result  =await execute(user,searchQuery)
            if(!result){
                return res.status(401).json({message:"error in acceptedContractController"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error,"error in acceptedContractController");
            return res.status(500).json(error)
        }
    }
    return acceptedContractController
}