export const savedjobUseCase = (dependencies) => {
    const { repositories : {repository : {getSavedJobs}}} = dependencies

    const execute = async(userId) => {
        const result = await getSavedJobs(userId)
        return result
    }
    return { execute }
}