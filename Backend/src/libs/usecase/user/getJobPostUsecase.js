export const getJobPostUsecase =(dependencies)=>{
    const {repositories : {repository : {getjobcards , getMatchingjobcards}}} = dependencies
    const execute = async(heading , userId)=>{

        try {

            if(heading === "Most Recent"){
                const result =  await getjobcards()
                return result
            }else if (heading === "Best Matches"){
                const result =  await getMatchingjobcards(userId)
                return result
            }
           
        } catch (error) {
            console.error("error in getjobPostuseCase");
        }
    }
    return {execute}
}