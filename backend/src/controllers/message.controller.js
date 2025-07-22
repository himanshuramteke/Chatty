import cloudinary from "../config/cloudinaryConfig.js";
import { getReceiverSocketId, getIO } from "../config/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebarController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebarController", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesController", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessagesController = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!senderId || !receiverId) {
      console.log("senderId or receiverId missing");
      return res.status(400).json({ message: "Invalid sender or receiver" });
    }

    let imageUrl;
    if (image) {
      console.log("Uploading image...");
      //Upload base64 to image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
      console.log("Image uploaded", imageUrl);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      const io = getIO();
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessagesController", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
