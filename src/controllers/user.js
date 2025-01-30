import UrlModel from "../models/url.model.js";
import userModel from "../models/user.model.js";
import { validateUrlId } from "../validation/urlValidation.js";

const getUser = async (req, res) => {
  let user = await userModel
    .findById(req.params.userId)
    .select("-password")
    .populate("last_shortened");
  return res.json(user);
};

const getUserUrls = async (req, res) => {
  if (req.params.userId !== req.auth._id) return res.status(401).send("Unauthorized");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const urls = await UrlModel.find({
      user: req.params.userId,
    })
      .populate({
        path: "user",
        select: "username email",
      })
      .sort({ _id: -1 })
      .select("-createdAt -updatedAt ")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalUrls = await UrlModel.countDocuments({ user: req.params.userId });

    res.json({
      urls,
      totalPages: Math.ceil(totalUrls / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Try again");
  }
};

const editUrl = async (req, res) => {
  const { urlId, newUrlId, userId } = req.body;

  const validationError = validateUrlId(newUrlId);
  if (validationError) return res.status(400).send(validationError);
  if (urlId == newUrlId) return res.status(400).send("You haven't made any change to URL");

  try {
    const url = await UrlModel.findOne({
      urlId: urlId,
      user: userId,
    });
    if (url) {
      url.urlId = newUrlId;
      url.shortUrl = `${process.env.CLIENT_URL}/${newUrlId}`;
      url.save();

      const user = await userModel
        .find({
          _id: userId,
        })
        .select("-password")
        .populate("last_shortened")
        .exec();

      res.json({ url, user });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Try again");
  }
};

export { getUser, getUserUrls, editUrl };
