const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const DOMPurify = require("isomorphic-dompurify");

const secretKey = crypto.randomBytes(32).toString("hex");
const empSchema = require("../models/employee");
const leaveApplication = require("../models/leaveApplication");
const attendance = require("../models/attendance");

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
      // secure: true,
      // sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful",
      emp_id: employee._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllEmployees(req, res) {
  try {
    const data = await empSchema.find();

    const formattedData = data.map((employee) => ({
      ...employee._doc,
      cv: employee.cv
        ? `data:image/jpeg;base64,${Buffer.from(employee.cv).toString(
            "base64"
          )}`
        : null,
      userImage: employee.userImage
        ? `data:image/jpeg;base64,${Buffer.from(employee.userImage).toString(
            "base64"
          )}`
        : null,
      idImage: employee.idImage
        ? `data:image/jpeg;base64,${Buffer.from(employee.idImage).toString(
            "base64"
          )}`
        : null,
    }));

    res.json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createEmployee(req, res) {
  const { name, email, password, join_date, cv, userImage, idImage } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    const sanitizeName = DOMPurify.sanitize(name);
    const sanitizemail = DOMPurify.sanitize(email);
    const sanitizeDate = DOMPurify.sanitize(join_date);

    const cvBuffer = Buffer.from(cv, "base64");
    const userImageBuffer = Buffer.from(userImage, "base64");
    const idImageBuffer = Buffer.from(idImage, "base64");

    const newEmployee = new empSchema({
      name: sanitizeName,
      email: sanitizemail,
      password: hash,
      join_date: sanitizeDate,
      cv: cvBuffer,
      userImage: userImageBuffer,
      idImage: idImageBuffer,
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getEmpById(req, res) {
  const { id } = req.params;
  try {
    const getDataById = await empSchema.findById(id);
    if (!getDataById) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({
      data: getDataById,
      message: "Employee get successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateEmployee(req, res) {
  const { id } = req.params;
  const { name, email, password, cv, userImage, idImage } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    const sanitizeName = DOMPurify.sanitize(name);
    const sanitizemail = DOMPurify.sanitize(email);
    const cvBuffer = Buffer.from(cv, "base64");
    const userImageBuffer = Buffer.from(userImage, "base64");
    const idImageBuffer = Buffer.from(idImage, "base64");
    
    const updatedEmployee = await empSchema.findByIdAndUpdate(
      id,
      {
        name: sanitizeName,
        email: sanitizemail,
        password: hash,
        cv: cvBuffer,
        userImage: userImageBuffer,
        idImage: idImageBuffer,
      },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    const deletedEmployee = await empSchema.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await leaveApplication.deleteMany({ emp_id: id });
    await attendance.deleteMany({ user_id: id });
    res.json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getApplications(req, res) {
  const emp_id = req.query.emp_id;
  try {
    const data = await leaveApplication.find({ emp_id: emp_id }).sort({ created_at: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


async function applyLeave(req, res) {
  const { emp_id, start_date, end_date, reason } = req.body;
  try {
    const employee = await empSchema.findById(emp_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const sanitizeReason = DOMPurify.sanitize(reason);

    const newLeave = new leaveApplication({
      emp_id: emp_id,
      start_date: start_date,
      end_date: end_date,
      reason: sanitizeReason,
      status: "pending",
      created_at: Date.now(),
    });
    await newLeave.save();
    res.status(200).json({ message: "Leave sent successfully" });
  } catch (err) {
    console.error(err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
async function editLeave(req, res) {
  const { id } = req.params;
  const { emp_id, start_date, end_date, reason } = req.body;
  try {
    const employee = await empSchema.findById(emp_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const sanitizeReason = DOMPurify.sanitize(reason);

    const editLeave = await leaveApplication.findByIdAndUpdate(
      id,
      {
        emp_id,
        start_date: startDate,
        end_date: endDate,
        reason: sanitizeReason,
        status: "pending",
        created_at: Date.now(),
      },
      { new: true }
    );

    if (!editLeave) {
      return res.status(404).json({ message: "Cant Edit" });
    }
    res.json({
      message: "Edit Successfully",
      leave: editLeave,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  login,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  applyLeave,
  editLeave,
  getApplications,
  getEmpById,
};
