export const findWorkUsecase = (dependencies) => {
    const {
        repositories: {
            repository: { findWorks },
        },
    } = dependencies;
    const execute = async (searchQuery) => {
        const result = await findWorks(searchQuery)
        return result
    }
    return { execute }
}