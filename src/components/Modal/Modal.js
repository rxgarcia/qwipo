import ReactDOM from "react-dom";
import React from "react";
import "../../styles/Modal.css";

const Backdrop = (props) => {
  return <div className="modal-backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return <div className={`modal-overlay ${props.modalStyle}`}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay modalStyle={props.modalStyle}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
