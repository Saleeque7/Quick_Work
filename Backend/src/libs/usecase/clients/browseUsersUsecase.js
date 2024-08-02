export const browseUsersUsecase  =(dependencies)=>{
    const { repositories: {clientRepository: {browseUsers} } } = dependencies
const execute =async(searchQuery) => {
    const users = await browseUsers(searchQuery)
    return users
}
return {execute}
}