import React, { useEffect, useState } from "react";
import "./announcements.css";
import SearchForm from "../admin/search-form/SearchForm";
import AnnouncementsFilter from "../announcements-filter/AnnouncementsFilter";
import ElementCard from "../element-card/ElementCard";
import axios from "axios";

const Announcements = ({ userData }) => {
  const [ann, setAnn] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [annImages, setAnnImages] = useState([]);

  useEffect(() => {
    const get_items = async () => {
      try {
        const { data } = await axios.get(
          "https://service.homely.am/api/items/all"
        );
        setAnn(data.all_items.reverse());
        
        setAnnImages(() => data.all_images);
      } catch (err) {
        console.log(err);
      }
    };
    get_items();
    const get_brokers = async () => {
      try {
        const { data } = await axios.get(
          "https://service.homely.am/api/admin/get_all"
        );
        setBrokers(() => data.data);
      } catch (error) {
        console.log(error);
      }
    };

    get_brokers();
  }, []);

  return (
    <div className="workers-page">
      <div style={{ height: "100px" }}></div>
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
                user_type={userData.type}
                all={el}

              />
              <div className="broker_owner_info">
                {(userData.type !== "broker" || Number(el.adminid) === Number(userData.id)) && (
                  <>
                    <b>Գույքի տեր</b>
                    <div className="owner_data">
                      <span>{el.owner_name}</span>
                      <b>{el.owner_phone}</b>
                    </div>
                    <hr />
                  </>
                )}
                <b>Գործակալ</b>
                <br />
                {brokerData.map((element) => {
                  return (
                    <div className="broker_info">
                      <div>
                        <span>
                          {element.name} {element.surname}
                        </span>
                        <br />
                        <b>{element.phone}</b>
                        <br />
                        <b>{element.email}</b>
                      </div>
                      <img src={element.image} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
