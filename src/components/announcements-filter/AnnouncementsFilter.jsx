import React from "react";
import "./announcements-filter.css";

const AnnouncementsFilter = () => {
  return (
    <div className="announcements-filter">
      <div className="filters">
        <div className="filter-inputs">
          <input placeholder="Որոնել..." className="filter-search-inpt" />
          <div className="inpts-panel">
            <input placeholder="Գին սկսած" className="filter-search-inpt" />
            <input placeholder="Գին մինչև" className="filter-search-inpt" />
            <input placeholder="Մակերես" className="filter-search-inpt" />
          </div>
        </div>
        <hr />
        <div>
            <input />
            <input />
            <input />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsFilter;
