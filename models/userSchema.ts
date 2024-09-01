import crypto from "crypto";
import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Define an interface for the User schema
interface IUser extends Document {
  fullname: string;
  email: string;
  pic?: string;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  isPasswordCorrect(enteredPassword: string): Promise<boolean>;
  isPasswordChanged(JWTCreatedTime: number): boolean;
  createPasswordResetToken(): string;
}

// Create the User Schema
const userSchema: Schema<IUser> = new Schema({
  fullname: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  pic: {
    type: String,
    default:
      "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: IUser, passwordConfirm: string): boolean {
        return passwordConfirm === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hash the password before saving the user
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Update passwordChangedAt field
userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// Method to check if the password is correct
userSchema.methods.isPasswordCorrect = async function (
  enteredPassword: string ,
  dbPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

// Method to check if the password was changed after the JWT was issued
userSchema.methods.isPasswordChanged = function (
  JWTCreatedTime: number
): boolean {
  if (this.passwordChangedAt) {
    const passwordChangedAt = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );

    return JWTCreatedTime < passwordChangedAt;
  }

  return false;
};

// Method to create a password reset token
userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
