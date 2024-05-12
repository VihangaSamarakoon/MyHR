const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const secretKey = crypto.randomBytes(32).toString("hex");

const adminLogin = require("../models/admin");
const leaveApplication = require("../models/leaveApplication");
const Employee = require("../models/employee");
const Attendance = require("../models/attendance");

function authenticate(req, res, next) {
  const token = req.cookies.adminToken;
  // console.log(token);
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
  const { username, password } = req.body;
  try {
    const admin = await adminLogin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ adminID: admin._id }, secretKey, {
      expiresIn: "1h",
    });
    res.cookie("adminToken", token, {
      httpOnly: true,
      // secure: true,
      // sameSite: "none",
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
    res.clearCookie("adminToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getApplications(req, res) {
  try {
    const data = await leaveApplication.find().sort({ created_at: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


async function approveApplications(req, res) {
  const { _id, status } = req.body;
  try {
    if (status !== "") {
      const approveApplication = await leaveApplication.findByIdAndUpdate(
        _id,
        {
          status: status,
        },
        { new: true }
      );
      if (!approveApplication) {
        return res.status(404).json({ message: "application not found" });
      }
      res.json({
        message: `${status} successfully`,
        application: approveApplication,
      });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getEmpNameAttadance(req, res) {
  try {
    const name = req.query.name;
    const employee = await Employee.findOne({ name });
    if (employee) {
      const attendance = await Attendance.find({ user_id: employee._id });
      const data = attendance.map(attendance => ({
        date: attendance.date,
        check_in_time: attendance.check_in_time,
        check_out_time: attendance.check_out_time
      }));
      res.json({ name: employee.name, data: data });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

module.exports = {
  login,
  authenticate,
  getApplications,
  approveApplications,
  getEmpNameAttadance,
  logout
};
