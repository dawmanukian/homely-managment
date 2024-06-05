import React, { useEffect } from "react";
import { useState } from "react";
import AnnouncementsFilter from "../../announcements-filter/AnnouncementsFilter";
import { FaFileCircleCheck } from "react-icons/fa6";
import axios from "axios";
import ElementCard from "../../element-card/ElementCard";

const MyAnnouncements = ({ userData }) => {
  const [ann, setAnn] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [annImages, setAnnImages] = useState([]);

  useEffect(() => {
    const get_items = async () => {
      try {
        const { data } = await axios.get(
          "http://service.homely.am/api/broker/items",
          {
            params: { adminid: String(userData.id) },
          }
        );

        setAnn(data.all_items);
        setAnnImages(data.all_images);
      } catch (error) {
        console.log(error);
      }
    };
    get_items();
  }, []);

  return (
    <div className="workers-page">
      <div style={{ height: "100px" }}></div>
      <p
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "18px",
          background: "#246BFD",
          paddingBottom: "15px",
          paddingTop: "15px"
        }}
      >
        Միայն Ձեր հայտարարությունները
      </p>
      <AnnouncementsFilter />
      <div className="all_ann">
        {ann.map((el) => {
          const itemIMAGES = annImages.filter((e) => e.item_id == el.id);
          const brokerData = brokers.filter((e) => e.id === Number(el.adminid));
          return (
            <div className="el_data_card">
              <ElementCard
                price={el.price}
                id={el.id}
                img={
                  itemIMAGES[0] &&
                  `https://service.homely.am/storage/images/${itemIMAGES[0].image}`
                }
                title={el.title}
                status={null}
                area={el.area}
                bathrooms={el.number_of_bathrooms}
                rooms={el.number_of_rooms}
                number_of_floors={el.number_of_floors}
                floors={el.floor}
                item_status={el.item_status}
                hidden_des={el.description_hidden}
                admin_id={el.adminid}
                user_id={userData.id}
              />
              <div className="broker_owner_info">
                {(userData.type !== "broker" ||
                  Number(el.adminid) === Number(userData.id)) && (
                  <>
                    <b>Գույքի տեր</b>
                    <div className="owner_data">
                      <span>{el.owner_name}</span>
                      <b>{el.owner_phone}</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAnnouncements;
