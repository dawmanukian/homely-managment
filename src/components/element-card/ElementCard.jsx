import React, { useState } from "react";
import "./element-card.css";
import { FaStar } from "react-icons/fa";
import { PiFireBold } from "react-icons/pi";
import { TbStairsUp } from "react-icons/tb";
import { TbDimensions } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { FaBed } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ElementCard = ({
  img,
  area,
  title,
  price,
  id,
  status,
  rooms,
  bathrooms,
  number_of_floors,
  floors,
  item_status,
  hidden_des,
  admin_id,
  user_id,
  user_type
}) => {

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: 'Գույքի հղումը պատճենված է',
      icon: "success"
    })
  }

  const [isHidden, setIsHidden] = useState(item_status);

  const cancel_item = async (id) => {
    try {
      const res = await axios.post(
        "https://service.homely.am/api/admin/update/status",
        {
          item_id: id,
        }
      );
      if (res.data.success) {
        setIsHidden(!isHidden);
      }
    } catch (error) {}
  };

  return (
    <div className="el-card">
      <div className="card-head">
        <div className="img_cover">
          <p>www.homely.am</p>
        </div>
        <img src={img} width={"100%"} className="card-img" />
      </div>
      <div className="card-data">
        <b className="card-title">{title}</b>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <div className="icon-div">
            <TbStairsUp />
            <span>
              {floors} / {number_of_floors}
            </span>
          </div>
          <div className="icon-div">
            <FaBed />
            <span>{rooms}</span>
          </div>
          <div className="icon-div">
            <TbDimensions />
            <span>{area}</span>
          </div>
          <div className="icon-div">
            <FaShower />
            <span>{bathrooms}</span>
          </div>
        </div>
        <span className="card-price">$ {price}</span>
      </div>
      <p style={{ paddingLeft: "15px" }}>{hidden_des}</p>
      <div className="card-footer">
        {status !== null ? (
          status ? (
            <div className="card-type ex">
              <FaStar />
              Էքսկլյուզիվ
            </div>
          ) : (
            <div className="card-type dis">
              <PiFireBold style={{ color: "#fff", fontSize: "18px" }} />
              Իջեցված գին
            </div>
          )
        ) : null}
        <div className="card-id">ID {id}</div>
        {!isHidden && <b style={{ color: "red" }}>Կասեցված է</b>}
      </div>
      <div className="crd_btns">
        {((Number(admin_id) === Number(user_id)) || user_type == 'manager') && (
          <>
            <button
              onClick={() => cancel_item(id)}
              style={isHidden ? null : { background: "green" }}
            >
              {isHidden ? "Կասեցնել" : "Ակտիվացնել"}
            </button>
            <Link to={`/change/${id}`}>
              <button style={{ background: "orange" }}>Փոփոխել</button>
            </Link>
          </>
        )}
        <a href={`https://team.homely.am/item/${id}`}>
          <button style={{ background: "#1A6883" }}>Նայել</button>
        </a>
        <CopyToClipboard text={`http://homely.am/item/${id}`}>
          <button style={{ background: "#9B6893" }} onClick={showSwal}>Կիսվել</button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ElementCard;
