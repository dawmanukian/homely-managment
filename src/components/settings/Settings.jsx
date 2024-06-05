import React, { useState } from "react";
import "./settings.css";
import { FaCameraRotate } from "react-icons/fa6";

const Settings = () => {
  const [profileImg, setProfileImg] = useState(
    "https://www.computerhope.com/jargon/g/guest-user.png"
  );

  // onSubmit = () => {

  // }

  return (
    <div className="settings">
      <form>
        <div className="user-image-section">
          <div style={{ position: "relative" }}>
            <img
              src={profileImg}
              height={"250px"}
              width={"250px"}
              className="user-img"
            />
            <input
              type="file"
              id="change-img"
              onChange={(evn) => {
                setProfileImg(URL.createObjectURL(evn.target.files["0"]));
              }}
            />
            <label htmlFor="change-img" className="change-profile-img">
              <FaCameraRotate />
            </label>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gap: "20px",
            margin: "25px 0px 0px 0px",
          }}
        >
          <button className="save-btn">Պահպանել</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
