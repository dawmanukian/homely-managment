import React from "react";
import "./item-card.css";
import { FaPenToSquare } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { TbMail } from "react-icons/tb";

const ItemCard = () => {
  return (
    <div className="item-card">
      <div className="item-data-panel">
        <img
          src="https://housing.com/news/wp-content/uploads/2023/03/exterior-design-shutterstock_1932966368-1200x700-compressed.jpg"
          width={"100%"}
          height={"200px"}
          className="item-img"
        />
        <b className="item-header">Նոր Նորք, Գյուրջյան փող</b>
        <p className="item-location">
          <FaLocationDot />
          Գյուրջյան փող, Նոր Նորք, Երևան
        </p>
        <div className="item-prices">
          <b>$ 130,000</b>
          <b>֏ 130,000</b>
          <b>₽ 130,000</b>
        </div>
      </div>
      <div className="broker-info">
        <img
          height={"150px"}
          width={"100%"}
          src="https://www.theforage.com/blog/wp-content/uploads/2022/07/stockbroker.jpg"
          className="broker-profile-img"
        />
        <div className="brokers-all-data">
          <b>Դավիթ Մանուկյան</b>
          <span>
            <FaPhone />
            +37494673735
          </span>
          <span>
            <TbMail style={{fontSize: '25px'}}/>
            davitmanukyan.d@gmail.com
          </span>
        </div>
      </div>
      <div className="item-btns">
        <button className="btn1">
          <FaPenToSquare />
          Փոփոխել
        </button>
        <button className="btn2">Պատմություն</button>
        <button className="btn3">
          <FaShareNodes />
          Կիսվել
        </button>
        <button className="btn4">
          <FaEye />
          Նայել
        </button>
        <button className="btn6">
          <FaTrashCan />
          Ջնջել
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
