import Schema from "../../database/index.js";
const { Chat , Message } = Schema

export const chatRepository = {
    createChat :async(userId , clientId)=>{
        try {
            const existingChat = await Chat.findOne({
                members: { $all: [userId, clientId] }
            });
    
            if (existingChat) {
                return existingChat;
            }
            const newChat = new Chat({
                members: [userId, clientId],
            });
    
            const savedChat = await newChat.save();
            return savedChat;
        } catch (error) {
            throw error(error ,"error in chatRepository")
        }
    },
    getchats:async(id)=> {
        try {
         const chats =   await  Chat.find({
                members:{$in:[id]}
            })
            return chats
        } catch (error) {
            throw error(error ,"error in chatRepository")
            
        }
    },
    findchats:async(id,seconid)=>{
        try {
            // chat.findone({members:{$all:[id ,secondid]}})
        } catch (error) {
            throw error(error ,"error in chatRepository")
        }
    },
    createMessage:async(data)=>{
        const {senderId , message , chatId } = data
        try {
            const messages = new Message({
                chatId,
                senderId,
                message
            })
            messages.save()
            return messages
        } catch (error) {
            console.error(error,"errorin repo");
        }     
    },
    getmessages:async(chatId)=>{
        try {
            const messages = await Message.find({ chatId });
            return messages;
        } catch (error) {
            throw new Error(error ,"error in chatRepository")
        }
    }
}