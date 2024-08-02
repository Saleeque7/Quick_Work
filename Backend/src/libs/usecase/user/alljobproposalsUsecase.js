export const alljobproposalsUsecase= (dependencies) => {
    const {repositories:{repository : {alljobproposals}}} = dependencies

    const execute = async(user,searchQuery)=>{
        const result = await alljobproposals(user,searchQuery)
        return result
    }
    return { execute }
}