export default (dependencies ) => {
    const {use_case : { submittedContractusecase }} = dependencies
    const submittedContractController =  async (req,res) => {
        try {
            const clientId = req.clientId
            const { searchQuery = ''} = req.query
            const { execute } = await submittedContractusecase(dependencies)
            const result = await execute(clientId,searchQuery)
        } catch (error) {
            console.error(error,"error in fetching submittedContractController");
            return res.status(500).json(error)
        }
    }
    return submittedContractController
}