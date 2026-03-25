import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"], // who sent it
      required: true,
    },
    content: {
      type: String,
      required: true, // actual message text
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;