import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true

  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Teacher", "Student"],
    required: true
  },
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject"
    }
  ]
}, { timestamps: true });

const User = mongoose.model('User',userSchema);

export default User;
            