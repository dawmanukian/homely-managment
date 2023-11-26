import React, { useState } from "react";
import WorkerCard from "../../worker-card/WorkerCard";
import SearchForm from "../../admin/search-form/SearchForm";
import RequestCard from "../request-card/RequestCard";
import UserMessage from "../user-message/UserMessage";

const Requests = () => {
  const [requests, setRequests] = useState([
    {
      id: Math.random(),
      name: "Դավիթ",
      message: "message",
      phone: "+37494673735",
    },
    {
      id: Math.random(),
      name: "Համլետ",
      message: "message",
      phone: "+37494673735",
    },
    {
      id: Math.random(),
      name: "Գոհար",
      message: "message",
      phone: "+37494673735",
    },
  ]);

  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({});

  return (
    <>
      {showMessage && (
        <UserMessage
          onClose={() => setShowMessage(false)}
          name={messageData.name}
          phone={messageData.phone}
          message={messageData.message}
        />
      )}
      <div className="workers-page">
        <div style={{ height: "180px", background: "#fff" }}></div>
        <div className="workers">
          {requests.map((el) => {
            return (
              <RequestCard
                key={el.id}
                name={el.name}
                phone={el.phone}
                message={el.message}
                onShowMessage={() => {
                  setMessageData({
                    name: el.name,
                    phone: el.phone,
                    message: el.message,
                  });
                  setShowMessage(true);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;
