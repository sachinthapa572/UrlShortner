import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 12,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    urls: [
      {
        type: Schema.Types.ObjectId,
        ref: 'url',
      },
    ],
    last_shortened: {
      type: Schema.Types.ObjectId,
      ref: 'url',
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

const userModel = model('User', UserSchema);

export default userModel;
