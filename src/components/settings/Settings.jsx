import React from "react";
import "./settings.css";
import { FaCameraRotate } from "react-icons/fa6";

const Settings = () => {
  return (
    <div className="settings">
      <form>
        <div className="user-image-section">
          <div style={{position: 'relative'}}>
            <img
              src="https://www.catbreedslist.com/cat-wallpapers/white-kitten-cute-big-eyes-art-1024x768.jpg"
              height={"250px"}
              width={"250px"}
              className="user-img"
            />
            <input type="file" id="change-img" />
            <label htmlFor="change-img" className="change-profile-img">
              <FaCameraRotate />
            </label>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gap: '20px',
          margin: '25px 0px 0px 0px'
        }}>
          <div className="user-data">
            <input placeholder="Անուն" />
            <input placeholder="Ազգանուն" />
          </div>
          <b>Փոխել գաղտնաբառը</b>
          <div className="user-data">
            <input placeholder="Հին գաղտնաբառ" />
            <input placeholder="Նոր գաղտնաբառ" />
          </div>
          <button className="save-btn">Պահպանել փոփոխությունները</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
