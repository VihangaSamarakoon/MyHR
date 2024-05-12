import React, { useState } from 'react'
import NoticeBox from './NoticeBox'
import { useNavigate } from 'react-router-dom'
import client from '../apiConfig';

function EmpNoticeCenter() {
  const [notidata,setNotidata] = useState([]);
  const navigate = useNavigate();

  useState(()=>{
    getNotice();
  },[]);

  async function getNotice(){
    try{
    const response = await client.get('/notification',{
      params:{
        emp_id: sessionStorage.getItem('userID')
      }
    })
    const data = response.data;
    setNotidata(data.data);
  }catch(err){
    console.log(err);
  }
  }

  return (
    <div className="centerContents">
    <div className="firstRow">

      <div className="topbtn">
      <button className="btn" onClick={()=>navigate('/user/attendance')}> 
            Attandance
          </button>
      </div>
    </div>
    <div className="firstRow" style={{flexDirection:'column',float:'left'}}>
    {notidata.map((notice) => (
        <NoticeBox key={notice._id} data={notice} />
      ))}
    </div>
  </div>
  )
}

export default EmpNoticeCenter