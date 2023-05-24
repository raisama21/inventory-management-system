const User = require("../model/User");

async function updateUserInfo(req, res) {
  try {
    const result = await User.findByIdAndUpdate(req?.params?.id, {
      $set: req?.body,
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserInfo(req, res) {
  try {
    const result = await User.findByIdAndDelete(req?.params?.id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updateUserInfo, deleteUserInfo };
