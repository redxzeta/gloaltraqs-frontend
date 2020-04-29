import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
const buttonStyle = {
  float: "right",
};
// const labelStyle = {
//   marginRight: "10px",
// };
const ConfirmationModal = ({
  modalState,
  toggle,
  onSubmit,
  title,
  buttonTitle,
  login,
}) => {
  return (
    <div>
      <Modal
        isOpen={modalState}
        toggle={toggle}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={toggle}> {title} </ModalHeader>
        <ModalBody>
          {login ? (
            <LoginRegister />
          ) : (
            <Button
              onClick={onSubmit}
              style={buttonStyle}
              className={"btn default-btn-purple"}
            >
              {buttonTitle}
            </Button>
          )}
          <Button className={"btn default-btn-purple"} onClick={toggle}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;

const LoginRegister = () => {
  return (
    <>
      <Link to="/login">
        <Button style={buttonStyle} className={"btn default-btn-purple"}>
          Click Here to Login
        </Button>
      </Link>

      <Link to="/register">
        <Button style={buttonStyle} className={"btn default-btn-purple"}>
          Click Here to Register
        </Button>
      </Link>
    </>
  );
};
