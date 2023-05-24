const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleAuthentication(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  const existingUser = await User.findOne({ email: email }).exec();
  if (!existingUser) {
    return res.sendStatus(404);
  }

  /* 
    Evaluate password 
  */
  const match = await bcrypt.compare(password, existingUser.password);
  if (match) {
    /*
      Create jsonwebtoken (jwt)
    */
    const token = jwt.sign(
      { email: existingUser._id },
      process.env.SECRET_TOKEN
    );

    const user_data = {
      _id: existingUser._id,
      username: existingUser.username,
      token,
    };

    res.cookie("user_data", user_data, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 720 * 60 * 60 * 1000,
    });

    res.status(200).json({ user_data });
  } else {
    res.status(401).json({ message: "unauthorized user" });
  }
}

module.exports = { handleAuthentication };
