import React, { useEffect, useState, useRef } from "react";
import "./EmployeeCenterCard.css";
import "../index.css";
import AttandanceAdminTable from "./AttandanceAdminTable";
import client from "../apiConfig";
import { toPng } from 'html-to-image';
import { createpdf } from '../PDfGenerate/pdfGenerator';



function AttendanceCenter() {
  const [searchType, setSearchType] = useState("date");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterDat, setFilterDat] = useState([]);
  const [searchName,setSearchName] = useState("");
  const [sname,setSname] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [startDate,endDate]);

  useEffect(()=>{
    if(searchName.trim() === ""){
      fetchData();
      setSname(false);
    }
  },[searchName]);

  async function fetchData() {
    try {
      const response = await client.get("/admin/attendance");
      const data = response.data;
      setFilterDat(data);
      if(startDate !== '' && endDate !== ''){
        filterData();
      }
      else{
        setData(data);
        
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchDatabyName(){
    try{
      const response = await client.get('/admin/attendance/get',{
        params: {
          name: searchName
        }
      });
      setFilterDat(response.data.data);
      setSname(true);
    }catch(err){
      if (err.response && err.response.data && err.response.data.message) {
        const errmessage = err.response.data.message;
        if(errmessage === 'Employee not found'){
        // setSname(false);
        alert(errmessage); 
        setSearchName('');
        // fetchData();  
        }
      } else {
        console.log("An error occurred:", err);
      }
    }
  }

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  function filterData() {
    const filter = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    setFilterDat(filter);
  }


  async function pdfGenerator(e) {
    e.preventDefault();
       try{
      const imageDataUrl = await toPng(tableRef.current);
      createpdf(imageDataUrl,searchName, startDate, endDate);
 
  }catch(err){
    console.error('Error generating PDF:', err);
  } 
}

  function handleSearch(){
    fetchDatabyName();
  }
   function handleSetName(e){
      setSearchName(e.target.value);
   }

  return (
    <div className="centerContents">
      <div className="firstRow">
        <div className="Search">
          <select
            name="Type"
            id="cars"
            className="status-select"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option value="date">Date</option>
            <option value="empName">Employee Name</option>
          </select>
          {searchType === "empName" ? (
            <>
            <input
              type="text"
              placeholder="Search..."
              className="search-input1"
              onChange={handleSetName}
              value={searchName}
            />
            <button onClick={handleSearch}>Search</button>
            </>
          ) : (
            <>
              <input
                type="date"
                className="status-select"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="status-select"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="topbtn">
          <button className="btn" onClick={pdfGenerator}>Generate Report</button>
        </div>
      </div>

      <div ref={tableRef} className="firstRo">
        <AttandanceAdminTable data={filterDat} sname={sname} searchName={searchName}/>
      </div>
    </div>
  );
}

export default AttendanceCenter;
