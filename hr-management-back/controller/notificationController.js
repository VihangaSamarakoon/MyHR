const noticicationSchema = require('../models/notification');
const leaveApplication = require('../models/leaveApplication');

async function create(req,res){
    const createTime = new Date();
    try{
    const _id = req.body;

        const getApplications = await leaveApplication.findById(_id);
        if(!getApplications){
            return res.status(404).json({ message: "Application not found" });
        }
        const message = `Your ${getApplications.start_date} to ${getApplications.end_date} Leave Request was ${getApplications.status}`; 

    const newNotification = new noticicationSchema({
        emp_id: getApplications.emp_id,
        message: message,
        aid: getApplications._id,
        createTime: createTime
    });
    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully" });
}
catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}
}

async function edit(req,res){
    try{
        
    }catch(err){

    }
}

async function getByEmpId(req, res) {
    try {
        const emp_id = req.query.emp_id;
        const getNoti = await noticicationSchema.find({ emp_id }).sort({ createTime: -1 });
        if (!getNoti || getNoti.length === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ data: getNoti });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
create,getByEmpId,edit
};