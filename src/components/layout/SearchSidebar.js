import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import Sidebar from "react-sidebar";
import { IconButton } from "@material-ui/core";
import { searchPins } from "../../actions/pins";
import DefaultProfilePic from "../images/ProfilePic-03.png";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { Markup } from "interweave";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Slider from "@material-ui/core/Slider";
import { Label } from "reactstrap";
import moment from "moment";
import InputGroup from "react-bootstrap/InputGroup";

import { Row, Col } from "react-bootstrap";
import { getPins } from "../../actions/pins";
import { searchUsers, getNextPreviousUsers } from "../../actions/users";

const options = [
  { value: "1", label: "Personal" },
  { value: "2", label: "Resources" },
  { value: "3", label: "Historical" },
];

// const labelStyle = {
//   marginRight: "10px",
// };

function SearchSidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(options);
  const dispatch = useDispatch();

  const pinData = useSelector((state) => state.pins.pins);
  const users = useSelector((state) => state.auth.users);
  const [userSearchText, setUserSearchText] = useState("");

  const [dateRange, setDateRange] = useState([]);
  const { maxPinDate, minPinDate } = props;
  useEffect(() => {
    setDateRange({
      start: minPinDate,
      end: maxPinDate,
      first: Number(moment(minPinDate).format("YYYY")),
      last: Number(moment(maxPinDate).format("YYYY")),
    });
  }, [minPinDate, maxPinDate]);

  //   dispatch(getPins());

  const onSetSidebarOpen = (open) => {
    setSidebarOpen({ sidebarOpen: open });
  };

  const submitSearch = (e) => {
    // console.log("pin type " + pinType);
    e.preventDefault(); //prevents refresh of page
    // console.log(startDate);
    // console.log(endDate);
    const start = moment(dateRange.start).format("YYYY-MM-DD");
    const end = moment(dateRange.end).format("YYYY-MM-DD");

    let categorySearchQuery = "";
    if (selectedCategories === null) {
      setSelectedCategories(options);
    } else {
      for (const [index, value] of selectedCategories.entries()) {
        if (index < selectedCategories.length - 1) {
          // console.log(value.value);
          categorySearchQuery += value.value + ",";
          // console.log("is the num");
        } else {
          // console.log(value.value);
          categorySearchQuery += value.value;
          // console.log("is the num");
        }
      }
    }
    // console.log(categorySearchQuery);
    // console.log("is the query");
    dispatch(searchPins(searchText, categorySearchQuery, start, end));
    props.setIsSearch(true);
  };
  const submitUserSearch = (e) => {
    e.preventDefault(); //prevents refresh of page
    dispatch(searchUsers(userSearchText));
  };
  function valuetext(value) {
    // console.log(dateRange);
    // console.log("slider val is " + value);
    return value;
  }

  const clearFilters = () => {
    setSelectedCategories(options);

    setSearchText("");

    setDateRange({
      first: Number(moment(minPinDate).format("YYYY")),
      last: Number(moment(maxPinDate).format("YYYY")),
      start: minPinDate,
      end: maxPinDate,
    });
    // let mapBounds = props.mapReference.getBounds();
    // let south = mapBounds.getSouth();
    // let west = mapBounds.getWest();
    // let north = mapBounds.getNorth();
    // let east = mapBounds.getEast();
    //dispatch(getPinsWithBounds(north, south, east, west));
    dispatch(getPins());
    props.setIsSearch(false);
    // dispatch(getPins());
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    multiValue: (styles, { data }) => {
      const category = data.value;
      let color = "white";
      if (category === "1") {
        color = "#e01783";
      } else if (category === "2") {
        color = "#00ce7d";
      } else {
        color = "#248dc1";
      }
      return {
        ...styles,
        backgroundColor: color,
        color: "white",
        fontFamily: "Eina, Arial",
        textTransform: "lowercase",
        borderRadius: "8px",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
      fontFamily: "Eina, Arial",
      textTransform: "lowercase",
      borderRadius: "8px",
    }),
  };

  const storySearch = (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={submitSearch} noValidate={true}>
        <div className={"form-group"}>
          <label className="sidebar-text">Search:</label>
          <input
            className="form-control sidebar-input-placeholder"
            id="searchForm"
            label="Search"
            placeholder={"Search for stories"}
            name={"searchText"}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <label className="sidebar-text">Category: </label>
        <Select
          isMulti
          defaultValue={options}
          value={selectedCategories}
          onChange={(categories) => setSelectedCategories(categories)}
          options={options}
          styles={colorStyles}
        />
        <InputGroup style={{ marginTop: "20px" }}>
          <Label
            className="sidebar-text"
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "10px",
            }}
            for="dateRange"
          >
            Search date range
          </Label>
          <DatePicker
            value={dateRange.start}
            minDate={minPinDate}
            maxDate={dateRange.end}
            onChange={(sdate) => {
              setDateRange({ ...dateRange, start: sdate });
            }}
            format={"MM/dd/yyyy"}
          />
          <DatePicker
            minDate={dateRange.start}
            maxDate={maxPinDate}
            value={dateRange.end}
            onChange={(date) => {
              setDateRange({ ...dateRange, end: date });
            }}
            format={"MM/dd/yyyy"}
          />
          <Slider
            min={Number(moment(minPinDate).format("YYYY"))}
            max={Number(moment(maxPinDate).format("YYYY"))}
            // min={1000}
            // max={Number(new Date().getFullYear())}
            value={[dateRange.first, dateRange.last]}
            valueLabelDisplay="auto"
            onChange={(event, newValue) => {
              setDateRange({
                first: newValue[0],
                last: newValue[1],

                start: new Date(
                  moment(dateRange.start).set("year", newValue[0])
                ),
                end: new Date(moment(dateRange.end).set("year", newValue[1])),
              });
            }}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </InputGroup>
        <div className="form-group" style={{ padding: "20px 20px 20px 20px" }}>
          <button
            type="submit"
            style={{ float: "right" }}
            className="btn btn-primary default-btn-purple"
          >
            Search
          </button>
          <button
            type="submit"
            style={{ float: "left", paddingRight: "20px" }}
            className="btn btn-primary default-btn-purple"
            onClick={() => clearFilters()}
          >
            Clear filters
          </button>
        </div>
      </form>
      <div>
        <p
          className="sidebar-text"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          {" "}
          {pinData.length}{" "}
          {pinData.length === 1 ? " search result" : " search results"}{" "}
        </p>

        {pinData.map((story, index) => {
          return (
            <Card
              key={story.id}
              className={"story-card"}
              style={{ marginTop: "10px" }}
            >
              <Link
                style={{ textDecoration: "inherit" }}
                to={`story/${story.id}`}
                onClick={() => props.centerMarker(story)}
              >
                <div
                  className={
                    story.category === 1
                      ? "search-bar-story-card-trim-personal"
                      : story.category === 2
                      ? "search-bar-story-card-trim-resources"
                      : "search-bar-story-card-trim-historical"
                  }
                ></div>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={"sidebar-story-title"}
                    >
                      {story.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={"sidebar-story-description"}
                    >
                      <Markup
                        content={story.description.substring(0, 250) + "..."}
                        blockList={["img"]}
                        noHtml={true}
                      />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={"sidebar-story-read-more"}
                    >
                      view story
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // let resultCount = pinData.length;
  // console.log(props.minPinDate + " is MIN PIN DATE");
  // console.log(dateRange + " is the date range");

  return (
    <Sidebar
      sidebar={
        <div style={{ padding: "5px 5px 5px 5px" }}>
          <IconButton
            onClick={() => props.setSidebarOpen(false)}
            style={{ float: "right" }}
            aria-label="close"
          >
            <CloseIcon color="disabled"></CloseIcon>
          </IconButton>
          <div style={{ marginTop: "20px" }}>
            <Tabs defaultActiveKey="stories" id="uncontrolled-tab-example">
              <Tab
                eventKey="stories"
                tabClassName="sidebar-text"
                title="Search Stories"
              >
                {storySearch}
              </Tab>
              <Tab
                eventKey="users"
                tabClassName="sidebar-text"
                title="Search Users"
              >
                <UserSearchForm
                  // going to comment out for now - kinda buggy
                  // previous={users.previous}
                  // next={users.next}
                  count={users.count}
                  onSubmit={submitUserSearch}
                  setUserSearchText={setUserSearchText}
                  userSearchText={userSearchText}
                />
                {users.results && <ListUsersSearch users={users.results} />}
              </Tab>
            </Tabs>
          </div>
        </div>
      }
      open={props.sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      pullRight={true}
      sidebarClassName={"search-sidebar"}
      styles={{
        overlay: {
          position: "absolute",
          visibility: "hidden",
          transition: "none",
          backgroundColor: "transparent",
        },
      }}
    >
      {/* {console.log(pinData.length + " is the length")} */}
    </Sidebar>
  );
}

export default SearchSidebar;

const UserSearchForm = (props) => {
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={props.onSubmit}>
        <div className={"form-group"}>
          <label className="sidebar-text">Search: </label>
          <input
            className="form-control sidebar-input-placeholder"
            id="searchForm"
            label="Search"
            placeholder={"Search for users"}
            name={"userSearchText"}
            onChange={(e) => props.setUserSearchText(e.target.value)}
            value={props.userSearchText}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            style={{ float: "right" }}
            className="btn btn-primary default-btn-purple"
          >
            Search
          </button>
          {props.previous ? (
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => dispatch(getNextPreviousUsers(props.previous))}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          {props.next ? (
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => dispatch(getNextPreviousUsers(props.next))}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        <p
          className="sidebar-text"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          {" "}
          {props.count}{" "}
          {props.count === 1 ? " search result" : " search results"}{" "}
        </p>
      </div>
    </div>
  );
};

const ListUsersSearch = (props) => {
  return (
    <>
      {props.users.map((user, index) => {
        return (
          <Card
            key={user.id}
            className="story-card"
            style={{ marginTop: "10px" }}
          >
            <Link
              style={{ textDecoration: "inherit" }}
              to={`users/${user.username}`}
            >
              <CardActionArea>
                <CardContent>
                  <Row>
                    <Col md={3}>
                      {user.profileurl ? (
                        <img
                          src={user.profileurl}
                          style={{
                            borderRadius: "50%",
                            height: "100px",
                            width: "100px",
                          }}
                          alt="SearchUserProfilePicture"
                        />
                      ) : (
                        <img
                          alt="profilepic"
                          src={DefaultProfilePic}
                          style={{
                            borderRadius: "50%",
                            height: "100px",
                            width: "100px",
                            margin: "auto",
                            display: "block",
                          }}
                        />
                      )}
                    </Col>
                    <Col
                      md={9}
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="sidebar-story-title"
                      >
                        {user.username}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="sidebar-story-description"
                      >
                        {user.bio ? user.bio.substring(0, 50) + "..." : ""}
                      </Typography>
                    </Col>
                  </Row>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        );
      })}
    </>
  );
};
