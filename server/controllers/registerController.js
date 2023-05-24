const User = require("../model/User");
const bcrypt = require("bcrypt");

async function handleRegistration(req, res) {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  try {
    /* 
      check for duplicate username in databse (db)
    */
    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
      return res.sendStatus(409);
    }

    /*
      encrypt the password
    */
    const hashedPassword = await bcrypt.hash(password, 10);

    /*
      Create and store the new user in database
    */
    const result = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({ sucess: `New user ${email} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { handleRegistration };
