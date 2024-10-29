import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      //This works for creating and saving only
      validator: function (el)
      {
        return el === this.password
      },
      message: "Password are not the same"
    }
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    // select: false
  },
});

userSchema.pre("save", async function (next)
{
  //This line of code only runs functon if password is modified
  if (!this.isModified("password")) return next();

  // Hashes password with cost factor of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Removes passwordConfirm field to save memory
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next)
{
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next)
{
  //this points to the current query
  // if (this.getOptons().role == "admin") return next();

  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
)
{
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp)
{
  if (this.passwordChangedAt)
  {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function ()
{
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;