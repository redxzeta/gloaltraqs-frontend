import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
} from "reactstrap";
import TinyMCE from "react-tinymce";

import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";

// import
import { OpenStreetMapProvider } from "leaflet-geosearch";

// setup
const provider = new OpenStreetMapProvider();

const labelStyle = {
  marginRight: "10px",
};

const dateStyle = {
  marginRight: "10px",
  marginTop: "auto",
  marginBottom: "auto",
};

function ModalEditPinForm(props) {
  const validateEditForm = async (e) => {
    e.preventDefault();

    let address = props.userForm.address;
    let locality = props.userForm.locality;
    let region = props.userForm.region;
    let country = props.userForm.country;
    let postCode = props.userForm.postCode;

    let addressQuery =
      address + " " + locality + " " + region + " " + postCode + " " + country;
    // search
    let results = await provider.search({ query: addressQuery });

    if (props.userForm.title && props.userForm.description) {
      if (results.length > 0) {
        props.userForm.latitude = Number(results[0].y);
        props.userForm.longitude = Number(results[0].x);
      }
      props.onSubmit();
    }
  };
  const {
    address,
    locality,
    country,
    postCode,
    region,
    category,
    title,
    description,
    startDate,
    endDate,
  } = props.userForm;
  const { updateEditForm } = props;

  return (
    <>
      {" "}
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> edit story </ModalHeader>
        <Form onSubmit={validateEditForm} noValidate={true}>
          <ModalBody>
            {address && (
              <>
                <InputField
                  label="address"
                  title="Address"
                  value={address}
                  onChange={updateEditForm}
                />
                <InputField
                  label="locality"
                  title="Locality (City, township, etc.)"
                  value={locality}
                  onChange={updateEditForm}
                />
                <InputField
                  label="region"
                  title="Region (State, province, etc.)"
                  value={region}
                  onChange={updateEditForm}
                />
                <InputField
                  label="country"
                  title="Country"
                  value={country}
                  onChange={updateEditForm}
                />
                <InputField
                  label="postCode"
                  title="postCode"
                  value={postCode}
                  onChange={updateEditForm}
                />{" "}
              </>
            )}
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select
                name="category"
                value={category}
                onChange={props.updateEditForm}
              >
                <option value="1">Personal</option>
                <option value="2">Resources</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              {!title ? (
                <p className="text-danger">*Please enter a story title</p>
              ) : null}
              <Input
                className="form-control"
                type="text"
                name="title"
                value={title}
                onChange={props.updateEditForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">
                Description
                {!description ? (
                  <p className="text-danger">
                    *Please enter a story description
                  </p>
                ) : null}
              </Label>
              <TinyMCE
                content={description}
                config={{
                  height: 300,
                  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                  plugins: "autolink link image lists print preview emoticons",
                  toolbar: "undo redo | bold italic emoticons",
                }}
                onChange={(e) =>
                  props.setuserForm({
                    ...props.userForm,
                    description: e.target.getContent(),
                  })
                }
              />
            </FormGroup>
            <InputGroup>
              <label style={dateStyle} for="startDate">
                Start Date
              </label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="startDate"
                minDate={new Date("0100-01-01")}
                maxDate={endDate}
                value={startDate}
                onChange={(date) =>
                  props.setuserForm({
                    ...props.userForm,
                    startDate: date,
                  })
                }
              />
              <label style={dateStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="endDate"
                minDate={startDate}
                value={endDate}
                onChange={(date) =>
                  props.setuserForm({
                    ...props.userForm,
                    endDate: date,
                  })
                }
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              className="default-btn-purple"
              style={{ marginRight: "20px" }}
              onClick={props.toggle}
            >
              Cancel
            </Button>
            <Button s className="default-btn-purple">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEditPinForm;

const InputField = ({ label, title, value, onChange }) => {
  return (
    <FormGroup>
      <Label for={label}>{title}</Label>
      <Input
        className="form-control"
        type="text"
        name={label}
        value={value || ""}
        onChange={onChange}
      />
    </FormGroup>
  );
};
