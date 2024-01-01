import mongoose, { Document, Schema } from "mongoose";

type PersonalInfoType = {
  fullname: string;
  username: string;
  email: string;
  avatar?: string;
  password: string;
  bio?: string;
};

type UserType = {
  personalInfo: PersonalInfoType;
  refreshToken: string;
};

type UserSchemaType = UserType & Document;

// Create personal information schema
const personalInfoSchema = new Schema<PersonalInfoType>({
  fullname: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    minlength: [3, "fullname must be 3 letters long"],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    minlength: [3, "Username must be 3 letters long"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },

  bio: {
    type: String,
    maxlength: [200, "Bio should not be more than 200"],
    default: "",
  },
  avatar: {
    type: String,
  },
});

// Create user schema
const userSchema = new Schema<UserSchemaType>(
  {
    personalInfo: personalInfoSchema,
    refreshToken: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<UserSchemaType>("User", userSchema);
