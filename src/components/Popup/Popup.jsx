import React from 'react';
import './Popup.css';

const Popup = ({ children, onClose }) => {
  return (
    <div className="popup-background">
      <div className="popup">
        {children}
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Popup;