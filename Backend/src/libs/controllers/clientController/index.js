import clientAuthController from "./clientAuthController.js";
import browseUsersController from "./browseUsersController.js";
import jobSubmitController from "./jobSubmitController.js";
export default (dependencies) => {
    return {
        clientAuthController:clientAuthController(dependencies),
        browseUsersController:browseUsersController(dependencies),
        jobSubmitController:jobSubmitController(dependencies)
    }
}