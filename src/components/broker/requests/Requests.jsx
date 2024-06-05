import React, { useEffect, useState } from "react";
import RequestCard from "../request-card/RequestCard";
import UserMessage from "../user-message/UserMessage";
import axios from "axios";

const Requests = ({ id }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const get_requests = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/orders/requests",
          {
            broker_id: id,
          }
        );
        setRequests(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    get_requests();
  }, []);

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
