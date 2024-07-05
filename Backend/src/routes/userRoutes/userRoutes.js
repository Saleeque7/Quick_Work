import express from 'express'
import { userController } from '../../libs/controllers/index.js'
import { verifyToken, requireRole } from '../../libs/utils/middleWare.js/authMiddleWare.js'
import { uploadImage } from '../../libs/utils/multer/multer.js'

export default (dependecies) => {
    const { loadUserHome, userAuthController, verifyotpController, resendOtpController, addProfileController, addProfileSecController, experienceController, isUserprofileController ,getJobPostController } = userController(dependecies)

    const router = express.Router()
    router.get('/', loadUserHome)
    router.post('/register', userAuthController)
    router.post('/verify-otp', verifyotpController)
    router.post('/resend-otp', resendOtpController)
    router.post('/addProfile', uploadImage.single("image"), verifyToken, requireRole('user'), addProfileController)
    router.post('/addProfilesec', verifyToken, requireRole('user'), addProfileSecController)
    router.post('/experience', verifyToken, requireRole('user'), experienceController)
    router.post('/isUserprofileApi', verifyToken, requireRole('user'), isUserprofileController)
    router.get('/getJobPost', verifyToken, requireRole('user'), getJobPostController)

    return router
}