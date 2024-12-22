import Conversation from "../Models/conversationSchema.js";
import User from "../Models/userModels.js";

export const getUserBySearch=async(req,res)=>{
try {
    const search = req.query.search || '';
    const currentUserID = req.user._conditions._id;
    const user = await User.find({
        $and:[
            {
                $or:[
                    {username:{$regex:'.*'+search+'.*',$options:'i'}},
                    {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                ]
            },{
                _id:{$ne:currentUserID}
            }
        ]
    }).select("-password").select("email")

    res.status(200).send(user)

} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(error);
}
}


export const getCurrentChatter=async(req,res)=>{
    try {
        const currentUser = req.user._conditions._id;
        const currenTChatters = await Conversation.find({
            participants:currentUser
        }).sort({
            updatedAt: -1
            });

            if(!currenTChatters || currenTChatters.length === 0)  return res.status(200).send([]);

            const participantsID = currenTChatters.reduce((ids,conversation)=>{
                const otherParticipants = conversation.participants.filter(id => id !== currentUser);
                return [...ids , ...otherParticipants]
            },[])

            const otherParticipants = participantsID.filter(id => id.toString() !== currentUser.toString());

            const user = await User.find({_id:{$in:otherParticipants}}).select("-password").select("-email");

            const users = otherParticipants.map(id => user.find(user => user._id.toString() === id.toString()));

            res.status(200).send(users)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}