export const acceptedContractuseCase= (dependencies) => {
    const {repositories : {repository : { acceptedContracts }}} = dependencies
    const execute = async(id,searchQuery) => {
        const result  = await acceptedContracts(id,searchQuery)
        if(!result){
            throw new Error({message:"error in acceptedContractuseCase"})
        }
        return result
    }
    return { execute }
}