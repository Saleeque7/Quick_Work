import { app } from './app.js'
import connectDb from './config/db.js'
import confiq from './config/config.js'


const start = async ()=>{

    try {
        await connectDb()       
    } catch (error) {
        console.log(error);
    }
    app.listen(confiq.PORT, () => {
        console.log(`server running on ${confiq.PORT}`);
    })
}
start()