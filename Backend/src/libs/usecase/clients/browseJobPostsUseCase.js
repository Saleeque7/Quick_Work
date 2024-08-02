export const browseJobPostsUseCase = (dependencies)=>{
    const execute = async(id,searchQuery)=>{
    const { repositories: {clientRepository: {browseJobPostsapi} } } = dependencies
        try {
            const result  = await browseJobPostsapi(id,searchQuery)
            return result
        } catch (error) {
            console.error('Error browsing job posts:', error);
            
        }
    }
    return {execute}
}