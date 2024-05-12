const attendSchema = require('../models/attendance');

async function checkIn(req,res){
    const {user_id} = req.body;
    try{   
        const currentTime = new Date();
        
        const year = currentTime.getFullYear();
        const month = String(currentTime.getMonth() + 1).padStart(2, '0');
        const day = String(currentTime.getDate()).padStart(2, '0');

        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}`;

        const existingAttendance = await attendSchema.findOne({
            user_id: user_id,
            date: formattedDate
        });

        if (existingAttendance) {
            return res.status(400).json({
                message: "User has already checked in for today"
            });
        }
        
        const newAttandance = new attendSchema({
            user_id: user_id,
            date: formattedDate,
            check_in_time: formattedTime,
            check_out_time: null
        });
        await newAttandance.save();
        res.status(201).json({
            message: "Check In successfully",
            newAttandance: newAttandance._id
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function checkOut(req,res){
    const _id = req.body;

    try{   
       
        const currentTime = new Date();

        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}`;

        const existingAttendance = await attendSchema.findById(_id);

       

        if (!existingAttendance) {
            return res.status(404).json({ message: "Cannot find attendance" });
        }

        if (existingAttendance.check_out_time) {
            return res.status(400).json({ message: "User has already checked out" });
        }
        
        const checkOut = await attendSchema.findByIdAndUpdate(
            _id,
            {
            check_out_time:formattedTime
            },
            {new: true}
        );
        if(!checkOut){
            return res.status.json({message: "Cannot find attandance"});
        }
        res.json({
            message: "Check Out successfully",
            attandance: checkOut
        });
        
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getAttanceByUserID(req,res){
    const user_id = req.query.user_id;
    try{
        const data = await attendSchema.find({user_id: user_id});
        res.json(data);       

    }catch(err){
        console.log(err);
    }
}
async function getAttandance(req,res){
    try{
        const data = await attendSchema.find();
        const reversedData = data.reverse();
        res.json(reversedData); 

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    checkIn,
    checkOut,
    getAttanceByUserID,
    getAttandance
};