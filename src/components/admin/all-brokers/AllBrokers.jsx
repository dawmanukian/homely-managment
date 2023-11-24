import { React, useState } from "react";
import "../../../index.css";
import WorkerCard from "../../worker-card/WorkerCard";
import SearchForm from "../search-form/SearchForm";

const AllBrokers = () => {
  const [allWorkers, setAllWorkers] = useState([
    {
      id: Math.random(),
      name: "Դավիթ",
      surname: "Մանուկյան",
      phone: "+37494673735",
      email: "davit.manukyan@gmail.com",
    },
    {
      id: Math.random(),
      name: "Սամվել",
      surname: "Եսայան",
      phone: "+37494673735",
      email: "davit.manukyan@gmail.com",
    },
    {
      id: Math.random(),
      name: "Համլետ",
      surname: "Մանուկյան",
      phone: "+37494673735",
      email: "davit.manukyan@gmail.com",
    },
    {
      id: Math.random(),
      name: "Արթուր",
      surname: "Մանուկյան",
      phone: "+37494673735",
      email: "davit.manukyan@gmail.com",
    },
  ]);
  const [workers, setWorkers] = useState(allWorkers);

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
  return (
    <div className="workers-page">
      <SearchForm onSearch={(params) => search_filter(params)}/>
      <div className="workers">
        {workers.map((el) => {
          return (
            <WorkerCard
              name={el.name}
              surname={el.surname}
              phone={el.phone}
              email={el.email}
              key={el.id}
              type={'Գործակալ'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllBrokers;
