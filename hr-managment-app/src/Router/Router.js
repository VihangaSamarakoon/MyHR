import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginMain from '../Pages/LoginMain';
import AdminLogin from '../Pages/AdminLogin';
import EmpLogin from '../Pages/EmpLogin';
import EmpRegister from '../Component/EmpRegister';
import Admin from '../Pages/Admin';
import ReqLeaveEmp from '../Pages/ReqLeaveEmp';
import EmpNotice from '../Pages/EmpNotice';
import Employee from '../Pages/Employee';
import ReqLeaveAdmin from '../Pages/ReqLeaveAdmin';
import AttendanceAdmin from '../Pages/AttendanceAdmin';
import EmpAttandance from '../Pages/EmpAttandance';

function Router() {
  return (
    <div>
    <Routes>
    <Route path='/' element={<LoginMain/>} />
    <Route path='/adminlogin' element={<AdminLogin/>} />
    <Route path='/userlogin' element={<EmpLogin/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/admin/employee' element={<Employee/>}/>
    <Route path='/admin/leave' element={<ReqLeaveAdmin/>}/>
    <Route path='/admin/attendance' element={<AttendanceAdmin/>}/>
    <Route path='/user' element={<EmpNotice/>}/>
    <Route path='/user/leave' element={<ReqLeaveEmp/>}/>
    <Route path='/user/attendance' element={<EmpAttandance/>}/>
    {/* <Route path='/user/leave' element={<LeaveApplication/>}/> */}
  </Routes>
  </div>
  )
}

export default Router