import express from 'express'
import {clientController} from '../../libs/controllers/index.js'

export default (dependencies) =>{
    const { clientAuthController } = clientController(dependencies)
    const router = express.Router()
    router.post('/register',clientAuthController)

    return router
}