import Conversation from "../Models/conversationSchema.js";
import Message from "../Models/messageSchema.js";
import { getReciverSocketId,io } from "../Socket/socket.js";
import User from "../Models/userModels.js";
import languages from "./language.js";


function getLanguageCode(languageName) {
    const language = languages.find(lang => lang.name.toLowerCase() === languageName.toLowerCase());
    return language ? language.code : null;
  }

export const sendMessage =async(req,res)=>{
try {
    const {messages} = req.body;
    const {id:reciverId} = req.params;
    const senderId = req.user._conditions._id;

    const sender = await User.findById(senderId).select("language");
    const receiver = await User.findById(reciverId).select("language");

    

    const inputLanguage = getLanguageCode(sender.language) || "en"; // Default to English if not set
    console.log(inputLanguage);
    const outputLanguage = getLanguageCode(receiver.language) || "en"; // Default to English if not set


   

    /* let translatedMessage = messages;
    if (inputLanguage !== outputLanguage) {
      translatedMessage = await translateMessage(messages, inputLanguage, outputLanguage);
    }
 */
    // Find or create a conversation
    let chats = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }
    

    const newMessages = new Message({
        senderId,
        reciverId,
        message:messages,
        conversationId: chats._id
    })

    if(newMessages){
        chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(),newMessages.save()]);

     //SOCKET.IO function 
     const reciverSocketId = getReciverSocketId(reciverId);
     if(reciverSocketId){
        io.to(reciverSocketId).emit("newMessage",newMessages)
     }

    res.status(201).send(newMessages)

} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(`error in sendMessage ${error}`);
}
};




export const getMessages=async(req,res)=>{
try {
    const {id:reciverId} = req.params;
    const senderId = req.user._conditions._id;

    const chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    }).populate("messages")

    if(!chats)  return res.status(200).send([]);
    const message = chats.messages;
    res.status(200).send(message)
} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(`error in getMessage ${error}`);
}
}