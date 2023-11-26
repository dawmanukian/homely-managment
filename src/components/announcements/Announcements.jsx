import React from "react";
import "./announcements.css";
import ItemCard from "../item-card/ItemCard";
import SearchForm from "../admin/search-form/SearchForm";

const Announcements = () => {
  return (
    <div className="workers-page">
        <SearchForm />
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
