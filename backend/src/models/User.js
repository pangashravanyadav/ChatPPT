import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // User's display name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email — must be unique, no two users with same email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // always store as lowercase
      trim: true,
    },

    // Password — will be hashed before saving
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// ⚡ BEFORE saving to DB — hash the password automatically
// This runs every time a user is created or password is changed
userSchema.pre("save", async function (next) {
  // Only hash if password was actually changed
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  
  // Call next to continue saving
  next();
});

// ✅ Method to compare entered password with stored hash
// Used during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;