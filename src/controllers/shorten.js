import axios from "axios";
import ShortUniqueId from "short-unique-id";

import UrlModel from "../models/url.model.js";
import userModel from "../models/user.model.js";
import { expression, uniqueIdLength } from "../constant.js";

const ipinfoApiKey = process.env.IPINFO_API_KEY;
if (!ipinfoApiKey) {
  console.error("IPINFO_API_KEY not found in environment variables");
}

// Function to get geolocation using ipinfo.io
const getGeolocation = async (ipAddress) => {
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ipAddress}/json?token=${ipinfoApiKey}`
    );
    return {
      country: response.data.country,
      region: response.data.region,
      city: response.data.city,
    };
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return { country: "", region: "", city: "" }; // Default if geolocation fetch fails
  }
};

const shortenGuest = async (req, res) => {
  const { mainUrl } = req.body;

  let regex = new RegExp(expression);

  if (!mainUrl) return res.status(400).json("The URL field is required");
  if (!mainUrl.match(regex)) return res.status(400).json("Enter a valid URL");

  let uid = new ShortUniqueId({ length: uniqueIdLength });
  uid.setDictionary("alphanum_lower");
  const urlId = uid.randomUUID(); // Or `uid()` if supported

  try {
    let url = await UrlModel.findOne({ originalUrl: mainUrl, status: "public" });

    if (url) {
      // Get user geolocation using ipinfo.io
      const geoLocation = await getGeolocation(req.ip);

      const visit = {
        timestamp: new Date(),
        ipAddress: req.ip || req.headers["x-forwarded-for"] || "unknown",
        device: req.headers["user-agent"] || "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
        geoLocation,
        referrer: req.headers.referer || "",
      };

      url.visits += 1;
      url.visitHistory.push(visit);
      url.lastVisitedAt = new Date();

      await url.save();
      res.json(url);
    } else {
      const shortUrl = `${process.env.CLIENT_URL}/${urlId}`;

      const newUrl = new UrlModel({
        originalUrl: mainUrl,
        shortUrl,
        urlId,
        status: "public",
        date: new Date(),
      });

      await newUrl.save();
      res.json(newUrl);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

const shortenUser = async (req, res) => {
  const { mainUrl, userId } = req.body;

  let regex = new RegExp(expression);

  if (!mainUrl) return res.status(400).send("URL field is Empty");
  if (!mainUrl.match(regex)) return res.status(400).send("Enter a valid URL");

  let uid = new ShortUniqueId({ length: uniqueIdLength });
  uid.setDictionary("alphanum_lower");
  const urlId = uid.randomUUID(); // Or `uid()` if supported

  try {
    let url = await UrlModel.findOne({
      originalUrl: mainUrl,
      user: userId,
      status: "private",
    });

    let user = await userModel.findById(userId).select("-password").exec();

    if (url) {
      // Get user geolocation using ipinfo.io
      const geoLocation = await getGeolocation(req.ip);

      const visit = {
        timestamp: new Date(),
        ipAddress: req.ip || req.headers["x-forwarded-for"] || "unknown",
        device: req.headers["user-agent"] || "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
        geoLocation,
        referrer: req.headers.referer || "",
      };

      url.visits += 1;
      url.visitHistory.push(visit);
      url.lastVisitedAt = new Date();

      await url.save();
      const userUrl = user.urls.indexOf(url._id);
      if (userUrl >= 0) {
        user.urls.splice(userUrl, 1);
        user.urls.unshift(url._id);
        user.last_shortened = url._id;
        await user.save();
        await user.populate("last_shortened");
        return res.json({ url, user });
      }
    } else {
      const shortUrl = `${process.env.CLIENT_URL}/${urlId}`;

      const newUrl = new UrlModel({
        originalUrl: mainUrl,
        shortUrl,
        user: userId,
        urlId,
        status: "private",
        date: new Date(),
      });

      await newUrl.save();
      user.urls.unshift(newUrl._id);
      user.last_shortened = newUrl._id;
      await user.save();
      await user.populate("last_shortened");
      return res.json({
        url: newUrl,
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

export { shortenGuest, shortenUser };
