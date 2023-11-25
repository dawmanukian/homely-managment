import { React, useState } from "react";
import BrokerCard from "../broker-card/BrokerCard";
import "./adder-data.css";

const AdderData = () => {
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
  const [selectedBroker, setSelectedBroker] = useState(null);

  return (
    <div className="adder-data">
      <div className="all-brokers">
        {allWorkers.map((el) => {
          return (
            <BrokerCard
              id={el.id}
              key={el.id}
              name={el.name}
              surname={el.surname}
              selected={selectedBroker === el.id}
              phone={el.phone}
              onSelect={() => {
                setSelectedBroker(el.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdderData;
