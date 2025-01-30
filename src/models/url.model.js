import { model, Schema } from "mongoose";

const UrlSchema = new Schema(
  {
    urlId: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    visits: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "public",
    },
    visitHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        ipAddress: {
          type: String,
        },
        device: {
          type: String,
        },
        userAgent: {
          type: String,
        },
        geoLocation: {
          country: String,
          region: String,
          city: String,
        },
        referrer: {
          type: String,
        },
      },
    ],
    lastVisitedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UrlModel = model("url", UrlSchema);

export default UrlModel;
