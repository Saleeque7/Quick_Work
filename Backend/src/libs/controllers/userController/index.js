
import userAuthController from './authRegisterController.js'
import loadUserHome from './loadUserHomeController.js'
import verifyotpController from './verifyotpController.js'
import resendOtpController from './resendOtpController.js'
import addProfileController from './addProfileController.js'
import addProfileSecController from './addProfileSecController.js'
import experienceController from './experienceController.js'
import isUserprofileController from './isUserprofileController.js'

export default (dependencies)=>{
    return{
        loadUserHome:loadUserHome(dependencies),
        userAuthController:userAuthController(dependencies),
        verifyotpController:verifyotpController(dependencies),
        resendOtpController:resendOtpController(dependencies),
        addProfileController:addProfileController(dependencies),
        addProfileSecController:addProfileSecController(dependencies),
        experienceController:experienceController(dependencies),
        isUserprofileController:isUserprofileController(dependencies)
    }
}