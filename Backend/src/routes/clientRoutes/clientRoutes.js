import express from 'express'
import {clientController} from '../../libs/controllers/index.js'
import { verifyToken , requireRole } from '../../libs/utils/middleWare.js/authMiddleWare.js'
export default (dependencies) =>{
    const { clientAuthController , browseUsersController ,jobSubmitController} = clientController(dependencies)
    const router = express.Router()
    router.post('/register',clientAuthController)
    router.get('/browseUsers',verifyToken,requireRole('client'),browseUsersController)
    router.post('/jobSubmit',verifyToken,requireRole('client'),jobSubmitController)
    return router
}