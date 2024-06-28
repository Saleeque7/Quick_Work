import clientAuthController from "./clientAuthController.js";
export default (dependencies) => {
    return {
        clientAuthController:clientAuthController(dependencies)
    }
}