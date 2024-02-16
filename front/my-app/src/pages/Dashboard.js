import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";
import mascotImage from "../assets/mascot_1.png";
import bookImage from "../assets/book-removebg-preview 1.png";
import GetUser from "../lib/services/get_user_info";
import GetLeaderboard from "../lib/services/get_leaderboard";

const Dashboard = () => {
  const [firstName, setName] = useState([]);
  const [leaderboardArray, setLeaderboardArray] = useState([]);

  // Navigate to another page
  const [calendar_events, update_calendar_events] = useState([]);
  const navigate = useNavigate();

  const handleClick = (address) => {
    navigate(address);
  };

  const currentDate = new Date();
  useEffect(() => {
    const fetch_name = async () => {
      const user = await GetUser();
      setName(user.first_name.toUpperCase());
    };

    fetch_name();
  }, []);

  useEffect(() => {
    const fetch_leaderboard = async () => {
      const leaderboard = await GetLeaderboard();
      setLeaderboardArray(leaderboard);
    };

    fetch_leaderboard();
  }, []);

  useEffect(() => {
    const fetch_calendar_data = async () => {
      const response = await fetch(
        "http://localhost:8080/get-calendar-events",
        {
          method: "GET",
          credentials: "include", // Include cookies in the request if necessary
        }
      );

      // Parse the response as JSON
      const data = await response.json();

      const dates_this_week = [];
      const oneWeekFromToday = new Date(currentDate);
      oneWeekFromToday.setDate(currentDate.getDate() + 7);
      for (const event of data) {
        console.log(event.name, new Date(event.due_at));
        if (
          new Date(event.due_at) > new Date(currentDate) ||
          new Date(event.due_at) < oneWeekFromToday
        ) {
          dates_this_week.push(event);
        }
      }

      //   for (const event of dates_this_week) {
      //     console.log(event.due_at);
      //   }

      update_calendar_events(dates_this_week);
    };

    fetch_calendar_data();
  }, []);

  if (calendar_events.length < 1) {
     return (<><div className="loading"><h1>Loading...</h1></div></>);
   };

  return (
    <div className="dashboard-outer-container">
      <div className="dashboard-title">
        <div className="dashboard-title-name">
          <p>HELLO, {firstName}!</p>
        </div>
        <div className="dashboard-title-website-name">
          <h1>BACK TO THE BOOKS</h1>
        </div>
        <div className="logout-button">
          <button onClick={() => handleClick("/")}>LOGOUT</button>
        </div>
      </div>

      <div className="dashboard-redirect-container">
        <div className="leaderboard">
          <h1 className="leaderboard-title">LEADERBOARD</h1>
          <div className="stats">
          <p>RANK</p>
            <p >SCORE</p>
            <p>NAME</p>
          </div>
          <div className="scores">
          {leaderboardArray.map((item, index) => (
            <div className="score-row">
            <p>{index+1}</p>
            <p key={index}>{item.score}</p>
              <p key={index}>{item.first_name}</p>
            </div>
          ))}
          </div>
        </div>
        <div
          className="dashboard-redirect-study"
          onClick={() => handleClick("/StudyPage")}
          style={{ cursor: "pointer" }}
        >
          <p>STUDY</p>
          <img src={bookImage} style={{ width: "175px" }} />
        </div>
        <div
          className="dashboard-redirect-officehours"
          onClick={() => handleClick("/OfficeHoursPage")}
          style={{ cursor: "pointer" }}
        >
          <p>
            OFFICE
            <br />
            HOURS
          </p>
          <img src={mascotImage} style={{ width: "50px" }} />
        </div>
      </div>

      <div className="dashboard-calendar-container">
        <div className="dashboard-calendar-title">
          <h1>CALENDAR</h1>
        </div>
        <div className="dashboard-calendar-days">
          <div className="dashboard-calendar-days-row">
            <div className="calendar-card">
              <p><u>SUN</u></p>
              {calendar_events.map((item, index) => {
                if (new Date(item.due_at) === 0) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
              })}
            </div>
            <div className="calendar-card">
              <p><u>MON</u></p>
              {calendar_events.map((item, index) => {
                const dueDate = new Date(item.due_at);
                if (dueDate.getDay() === 1) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
                return null; // Return null if the condition is not met
              })}
            </div>

            <div className="calendar-card">
              <p><u>TUE</u></p>
              {calendar_events.map((item, index) => {
                const dueDate = new Date(item.due_at);
                if (dueDate.getDay() === 2) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
                return null; // Return null if the condition is not met
              })}
            </div>

            <div className="calendar-card">
              <p><u>WED</u></p>
              {calendar_events.map((item, index) => {
                const dueDate = new Date(item.due_at);
                if (dueDate.getDay() === 3) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
                return null; // Return null if the condition is not met
              })}
            </div>
            <div className="calendar-card">
              <p><u>THUR</u></p>
              {calendar_events.map((item, index) => {
                const dueDate = new Date(item.due_at);
                if (dueDate.getDay() === 4) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
                return null; // Return null if the condition is not met
              })}
            </div>

            <div className="calendar-card">
              <p><u>FRI</u></p>
              {calendar_events.map((item, index) => {
                const dueDate = new Date(item.due_at);
                if (dueDate.getDay() === 5) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
                return null; // Return null if the condition is not met
              })}
            </div>

            <div className="calendar-card">
              <p><u>SAT</u></p>
              {calendar_events.map((item, index) => {
                const dueDate = new Date(item.due_at);
                if (dueDate.getDay() === 6) {
                  return (
                    <Link to={item.html_url} className="dashboard-link">
                      {" "}
                      <div key={index}>{item.name}</div>
                    </Link>
                  );
                }
                return null; // Return null if the condition is not met
              })}
            </div>
          </div>
        </div>
        <div className="dashboard-calendar-content"></div>
      </div>
    </div>
  );
};

export default Dashboard;
