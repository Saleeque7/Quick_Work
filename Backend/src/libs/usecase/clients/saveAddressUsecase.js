export const saveAddressUsecase  = (dependencies) => {
    const { repositories: { clientRepository: { saveAddress} } } = dependencies;

    const  execute  = async (data , clientId) => {
        const result = await saveAddress(data,clientId)
        return result
    }
    return {execute}
}