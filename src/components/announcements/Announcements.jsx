import React from "react";
import "./announcements.css";
import ItemCard from "../item-card/ItemCard";
import SearchForm from "../admin/search-form/SearchForm";
import AnnouncementsFilter from "../announcements-filter/AnnouncementsFilter";

const Announcements = () => {
  return (
    <div className="workers-page">
      <div style={{height: '100px'}}></div>
      <AnnouncementsFilter />
      <div className="all-items">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};

export default Announcements;
