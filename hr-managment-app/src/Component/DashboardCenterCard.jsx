import React from 'react';
import Greeting from './Greeting';
import StatCard from './StatCard';
import AttendanceChart from './AttendanceChart';
import LeaveBox from './LeaveBox';
import { useNavigate } from 'react-router-dom';

function DashboardCenterCard() {
  const navigate = useNavigate();

  const titles = {
    title1: "No of Employee",
    title2: "Today Attendance",
    title3: "No of Leave Requests",
    title4: "No of Absant"
  };
  const statValue = {
    value1: 500,
    value2: 350,
    value3: 5,
    value4: 150,
  };
  const attendanceData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    values: [40, 85, 90, 87, 58] // Sample attendance percentages
  };

  return (
    <div className="centerContents">
      <div className="firstRow">
        <Greeting />
      </div>

      <div className="firstRow">
        <StatCard title={titles.title1} value={statValue.value1} />
        <StatCard title={titles.title2} value={statValue.value2} />
        <StatCard title={titles.title3} value={statValue.value3} />
        <StatCard title={titles.title4} value={statValue.value4} />
      </div>
      <div className="stack-Row">
      <div className="chart-content">
        <span>Attandance</span>
      <AttendanceChart data={attendanceData} />
      </div>
      <div className="leave-message">
       <span> Leave Request</span>
      <LeaveBox/>
     <LeaveBox/>
      <LeaveBox/>
      <button className='loadmore-btn' onClick={()=>navigate('/admin/leave')}>Load More...</button>
      </div>
      </div>
      
    </div>
  );
}

export default DashboardCenterCard;
