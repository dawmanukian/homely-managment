import React from "react";
import "./item-card.css";
import { FaPenToSquare } from "react-icons/fa6";

const ItemCard = () => {
  return (
    <div className="item-card">
      <div>
        <img
          src="https://housing.com/news/wp-content/uploads/2023/03/exterior-design-shutterstock_1932966368-1200x700-compressed.jpg"
          width={"100%"}
          height={"200px"}
          className="item-img"
        />
        <b>Նոր Նորք, Գյուրջյան փող</b>
        <p>Գյուրջյան փող, Նոր Նորք, Երևան</p>
        <b>$ 130,000</b>
      </div>
      <div className="item-btns">
        <button className="btn1">
          <FaPenToSquare />
          Փոփոխել
        </button>
        <button className="btn2">Պատմություն</button>
        <button className="btn3">Կիսվել</button>
        <button className="btn4">Փոփոխել</button>
        <button className="btn5">Պատմություն</button>
        <button className="btn6">Ջնջել</button>
      </div>
    </div>
  );
};

export default ItemCard;
