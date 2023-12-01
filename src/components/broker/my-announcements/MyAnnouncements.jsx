import React from "react";
import ItemCard from "../../item-card/ItemCard";
import SearchForm from "../../admin/search-form/SearchForm";
import AnnouncementsFilter from "../../announcements-filter/AnnouncementsFilter";
import { FaFileCircleCheck } from "react-icons/fa6";

const MyAnnouncements = () => {
  return (
    <div className="workers-page">
      <div style={{ height: "100px" }}></div>
      <p style={{ textAlign: "center", color: "gray", fontSize: "18px" }}>
        <FaFileCircleCheck
          style={{ color: "green", fontSize: "25px", marginRight: "10px" }}
        />
        Միայն Ձեր հայտարարությունները
      </p>
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

export default MyAnnouncements;
