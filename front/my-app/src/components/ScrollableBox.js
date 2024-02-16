import React, { useState, useEffect} from 'react';
import '../CSS/ScrollableBox.css';

const ScrollableBox = (props) => {
    const { responseList } = props;

    if (responseList.length < 1) {
        return (<>
            loading
        </>);
    }
    return (
        <div className="scrollablebox-container" >
            <ul >
                {responseList.map((item, index) => (
                   <li key={index} >{item.speaker}: {item.message}</li>
                ))}
            </ul>
        
        </div>
    );
}
 
export default ScrollableBox;