import React from "react";
import "../../../index.css";
import WorkerCard from "../../worker-card/WorkerCard";
import SearchForm from "../search-form/SearchForm";

const AllManagers = () => {
  return (
    <div className="workers-page">
      <SearchForm />
      <div className="workers">
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
      </div>
    </div>
  );
};

export default AllManagers;
