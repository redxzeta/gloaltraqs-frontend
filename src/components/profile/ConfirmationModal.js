import React from "react";

import { Button, Modal, ModalHeader, ModalBody, Form, Label } from "reactstrap";
const buttonStyle = {
  float: "right",
};
const labelStyle = {
  marginRight: "10px",
};
const ConfirmationModal = ({ modalState, toggle, onSubmit, title, buttonTitle }) => {
  return (
    <div>
      <Modal
        isOpen={modalState}
        toggle={toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={toggle}> {title} </ModalHeader>
        <ModalBody>

          <Button onClick={onSubmit} style={buttonStyle} className={"btn default-btn-purple"}>
            { buttonTitle }
          </Button>

          <Button className={"btn default-btn-purple"} onClick={toggle}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
