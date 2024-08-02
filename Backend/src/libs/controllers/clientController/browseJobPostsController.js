export default (dependencies) => {
    const {use_case : {browseJobPostsUseCase}} = dependencies
    const browseJobPostsController = async(req,res)=>{
        try {
            const clientId = req.clientId
            const { searchQuery = ''} =req.query
            const {execute} = await browseJobPostsUseCase(dependencies)
            const result = await execute(clientId,searchQuery)
           return  res.status(200).json(result)
        } catch (error) {
            console.error('error in browseJobController :', error)
            
        }
    }
    return browseJobPostsController
}