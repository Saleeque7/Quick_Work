export default (dependencies) => {
    const {use_case : {browseUsersUsecase} } = dependencies
    const browseUsersController = async (req, res) => {
        const { execute } = await browseUsersUsecase (dependencies)
        try {
            const users = await execute()
            if(!users){
                res.status(401).json({message : "error in fetch userData"})
            }

            res.status(200).json({users})
        } catch (error) {
            console.error('error in browseUsersController :', error)
        }
    }
    return browseUsersController
}