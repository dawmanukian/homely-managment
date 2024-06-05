import { React, useEffect, useState } from "react";
import "../../../index.css";
import WorkerCard from "../../worker-card/WorkerCard";
import SearchForm from "../search-form/SearchForm";
import axios from "axios";

const AllManagers = () => {
  const [allWorkers, setAllWorkers] = useState([]);
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    const get_users = async () => {
      try {
        const res = await axios.get("https://service.homely.am/api/users/managers");
        setAllWorkers(res.data.all_managers);
        setWorkers(res.data.all_managers);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    get_users();
  }, []);

  function search_filter(params) {
    if (params === "") {
      setWorkers(allWorkers);
    } else {
      setWorkers(
        allWorkers.filter((el) =>
          `${el.name.toLowerCase()} ${el.surname.toLowerCase()}`.includes(
            params.toLowerCase()
          )
        )
      );
    }
  }

  function hidde_deleted(id) {
    setAllWorkers(allWorkers.filter(el => el.id !== id))
    setWorkers(workers.filter(el => el.id !== id))
  }


  return (
    <div className="workers-page">
      <SearchForm onSearch={(params) => search_filter(params)} />
      <div className="workers">
        {workers.map((el) => {
          return (
            <WorkerCard
              name={el.name}
              surname={el.surname}
              phone={el.phone}
              email={el.email}
              key={el.id}
              image={el.image}
              id={el.id}
              hidde_deleted={id => hidde_deleted(id)}
              type={"Մենեջեր"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllManagers;
