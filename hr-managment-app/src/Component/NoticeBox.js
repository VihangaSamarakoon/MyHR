import React from 'react';
import moment from 'moment';
import "../Component/LeaveBox.css";

function NoticeBox({ data }) {
  const formattedCreateTime = moment(data.createTime).format('MMMM Do YYYY, h:mm:ss a');
  return (
    <div className="card" style={{ width: '800px' }}>
      <p><strong>Message: </strong>{data.message}</p>
      <p>{formattedCreateTime}</p>
    </div>
  );
}

export default NoticeBox;
