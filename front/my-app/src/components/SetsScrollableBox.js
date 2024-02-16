import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "../CSS/SetsScrollableBox.css";

const SetsScrollableBox = ({responseList}) => {
  // Navigate to another page
  const navigate = useNavigate();

  const handleClick = (className, id) => {
    navigate(`/StudySet/${className}/${id}`);
  };


  if (responseList.length  < 1) {
    return (<>
      Loading...
    </>);
  }
  return (
    <div className="study-sets">
      <ul>
        {responseList.map((item, index) => (
          <li onClick={() => handleClick(item.title, item.id)} style={{cursor:'pointer'}} key={index}>
            {" "}
            {">"} {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetsScrollableBox;
