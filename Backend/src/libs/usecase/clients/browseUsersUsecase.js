export const browseUsersUsecase  =(dependencies)=>{
    const { repositories: {clientRepository: {browseUsers} } } = dependencies
const execute =async() => {
    const users = await browseUsers()
    return users
}
return {execute}
}