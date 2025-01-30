import UrlModel from "../models/url.model.js";
import userModel from "../models/user.model.js";

async function redirect(req, res) {
  console.log(req.params);

  try {
    const url = await UrlModel.findOne({ urlId: req.params.urlId });
    if (url) {
      url.visits++;
      url.save();
      return res.redirect(307, url.originalUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
}

async function stats(req, res) {
  try {
    const urls = await UrlModel.find().countDocuments();
    const users = await userModel.find().countDocuments();
    return res.json({ urls, users });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
}

export { redirect, stats };
