
import React from 'react';

function Modal({ isOpen, onClose, children }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal_popup">
        {children}
        <button className="close_btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
