import React, { useState, useEffect} from 'react';
import '../CSS/ScrollableInputBox.css';

const ScrollableInputBox = ({onChange}) => {
    return (
        <textarea onChange={onChange} className="scrollable-input"></textarea>
     );
}
 
export default ScrollableInputBox;