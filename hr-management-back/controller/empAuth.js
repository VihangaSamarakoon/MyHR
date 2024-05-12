const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const DOMPurify = require("isomorphic-dompurify");
const empSchema = require("../models/employee");

const secretKey = crypto.randomBytes(32).toString("hex");

function authenticate(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

async function login(req, res) {
  const { name, password } = req.body;

  try {
    const employee = await empSchema.findOne({ name });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }
    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ empID: employee._id }, secretKey, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  login,
  logout,
  authenticate,
};
