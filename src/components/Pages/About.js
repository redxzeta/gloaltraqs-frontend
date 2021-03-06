import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { updateAboutUs, getAboutUs } from "../../actions/management";
import { useEffect, useState } from "react";
import TinyMCE from "react-tinymce";
import Logo from "../images/aboutUs_03.png";
function About() {
  const [editButtonValue, setEditButtonValue] = useState("Edit");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const { user } = auth;
  const [editorContent, setEditorContent] = useState("");

  let authorized = false;

  if (user) {
    if (user.is_administrator || user.is_moderator) {
      authorized = true;
    }
  }

  useEffect(() => {
    dispatch(getAboutUs());
  }, [dispatch]);

  const handleEditorChange = (e) => {
    setEditorContent(e.target.getContent());
  };

  const submitEdit = () => {
    const about_us = editorContent;
    const aboutUsData = { about_us };
    dispatch(updateAboutUs(aboutUsData));
  };

  const editAboutUs = () => {
    if (editMode) {
      setEditButtonValue("Edit");
      setEditMode(false);
    } else {
      setEditButtonValue("Close");
      setEditMode(true);
    }
    // show edit form
  };

  const canEdit = (
    <div className="admin-moderator-edit">
      <button
        onClick={editAboutUs}
        className="btn btn-success admin-moderator-edit"
      >
        {editButtonValue}
      </button>
    </div>
  );

  const showEditor = (aboutUsContent) => (
    <div>
      <TinyMCE
        content={aboutUsContent}
        config={{
          height: 300,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          plugins: "autolink link image lists print preview",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright",
        }}
        onChange={handleEditorChange}
      />
      <button
        onClick={submitEdit}
        className="btn btn-success admin-moderator-edit"
      >
        Submit
      </button>
    </div>
  );

  return (
    <div className={"main-content-div aboutUs-row"}>
      <Row style={{ paddingTop: "80px" }}>
        <Col md={5} className={"offset-md-1"}>
          <h2 className="aboutHeader">About Us</h2>

          <p className="aboutDesc">
            The arqive is an online map of queer stories (histories, herstories,
            theirstories) and resources created and collected by and for queer
            people all around the world to serve as a resource and a reminder
            that we are here, we've always been here, and we always will be.
            <br />
            <br />
            Originally founded by Cynthia Wang in 2014, then revamped in 2019
            with new Co-Founder Zachary Vernon. The arqive seeks to provide the
            full range of queer stories from historical/archival to personal by
            geolocating them and digitally preserving them. This is an attempt
            to counter the queer erasure that happens through the changing
            physical locations of queer stories. It also seeks to make visible
            historically marginalized voices and stories and connect queer
            people globally.
            <br />
          </p>
          <p className="copyright">
            <br />
            <br />
            This website was redeveloped, redesigned, and relaunched in 2020
            due to an amazing and diverse team of Cal State LA students.
            Without them, none of this would have been possible. Thanks to:
            <br/>
            <br/>
            Development Team
            <br />
            Fadi Haddad, Klaudia Hernandez, Nathaniel Suarez, Tony Truong, and Justine West
            <br />
            <br />
            Art Team
            <br />
            Art Director: Liz Sweeney
            <br />
            Designers: Angie Strong and Laura Torres
            <br />
            <br />
            Public Relations Team
            <br />
            Andrea Estrada, Aliyah Johnson, Laytyn MacKinnon, Nicholas Ochoa, Pamela Sanchez, Maryah Rendon, members of Zenith Experiential, Los Angeles (ZENX-LA)
            <br />
            <br />
            Special thanks to all of the faculty, administrators, and staff at Cal State LA that have helped us as well: John Hurley, Dr. Elaine Kang, Sylke Rene Meyer, Dr. Maria Karafilis, Dr. Kate Kurtin, Dr. David Olsen, Dr. Emily Allen, Dr. Linda Essig, Daniel Carlos, and Cal State LA’s Office of Research, Scholarship, and Creative Activities
          </p>

        </Col>
        <Col
          md={5}
          className="offset-md-1"
        >
          <img className="moveimage" src={Logo} alt="About Us" />
          <p className="copyright">
            ©COPYRIGHT Manuscripts and Archives Division, The New York Public
            Library. Barbara Gittings Photographer: thought to be, Gordon
            Rainsford. Simon Tseko Nkoli ©University of California. Harvy Milk
            ©Jonathan Silin, courtesy of The New York Public Library. Harry Hay
            PHOTO: COURTESY OF NETFLIX. Marsha P. JOhnson ©Liz Mangelsdorf/San
            Francisco Chronicle/Corbis. Phyllis Lyon and Del Martin ©William
            Lucas Walker.Peter Staley
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default About;
