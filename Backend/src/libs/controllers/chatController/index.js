import createChatcontroller from "./createChatcontroller.js"
import getChatController from "./getChatController.js"
import findchatController from "./findchatController.js"
import messageController from "./messageController.js"
import getmessageController from "./getmessageController.js"

export default (dependencies)=> {
    return {
        createChatcontroller:createChatcontroller(dependencies),
        getChatController:getChatController(dependencies),
        findchatController:findchatController(dependencies),
        messageController:messageController(dependencies),
        getmessageController:getmessageController(dependencies)
    }
}