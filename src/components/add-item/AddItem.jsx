import React, { useState } from "react";
import "./add-item.css";
import { FaImage } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FcPicture } from "react-icons/fc";
import AdderData from "../adder-data/AdderData";

const AddItem = () => {
  const [mainImg, setMainImg] = useState("");
  const [anotherImgs, setAnotherImgs] = useState([]);

  return (
    <div className="add-item">
      <form className="add-item-panel">
        <div className="select-item-panel">
          <h4>Հայտարարության տեսակ</h4>
          <div className="item-type-panel">
            <label className="item-type">
              <span>Վաճառք</span>
              <input type="radio" name="type" />
            </label>
            <label className="item-type">
              <span>Վարձակալություն</span>
              <input type="radio" name="type" />
            </label>
          </div>
        </div>
        <div className="select-item-panel">
          <h4>Գույքի տեսակ</h4>
          <div className="item-type-panel">
            <label className="item-type">
              <span>Բնակարան</span>
              <input type="radio" name="item-type" />
            </label>
            <label className="item-type">
              <span>Առանձնատուն</span>
              <input type="radio" name="item-type" />
            </label>
            <label className="item-type">
              <span>Կոմերցիոն</span>
              <input type="radio" name="item-type" />
            </label>
            <label className="item-type">
              <span>Հողատարածք</span>
              <input type="radio" name="item-type" />
            </label>
          </div>
        </div>
        <hr />
        <div className="item-headers">
          <div className="header-inpts">
            <input placeholder="Գույքի անվանումը ՝ Հայերեն" />
            <textarea placeholder="Գույքի նկարագրությունը ՝ Հայերեն"></textarea>
          </div>
          <hr />
          <div className="header-inpts">
            <input placeholder="Գույքի անվանումը ՝ Ռուսերեն" />
            <textarea placeholder="Գույքի նկարագրությունը ՝ Ռուսերեն"></textarea>
          </div>
          <hr />
          <div className="header-inpts">
            <input placeholder="Գույքի անվանումը ՝ Անգլերեն" />
            <textarea placeholder="Գույքի նկարագրությունը ՝ Անգլերեն"></textarea>
          </div>
        </div>
        <div className="price">
          <div className="item-price">
            <input placeholder="Գույքի արժեքը ՝ Դրամով" type="number" />
            <div className="symbol">
              <b>֏</b>
            </div>
          </div>
          <div className="item-price">
            <input placeholder="Գույքի արժեքը ՝ Ռուբլով" type="number" />
            <div className="symbol">
              <b>₽</b>
            </div>
          </div>
          <div className="item-price">
            <input placeholder="Գույքի արժեքը ՝ Դոլլարով" type="number" />
            <div className="symbol">
              <b>$</b>
            </div>
          </div>
          <div className="item-area">
            <input placeholder="Գույքի մակերեսը" type="number" />
          </div>
        </div>
        <input
          type="file"
          id="main-image"
          accept="image/*"
          multiple
          onChange={(evn) =>
            setMainImg(URL.createObjectURL(evn.target.files["0"]))
          }
        />
        <div className="main-img">
          {mainImg === "" ? (
            <label htmlFor="main-image" className="main-img-label">
              Գույքի գլխավոր նկար
              <FaImage className="img-icon" />
            </label>
          ) : (
            <div className="selected-img">
              <img
                src={mainImg}
                height={"200px"}
                width={"100%"}
                style={{ objectFit: "cover", borderRadius: "7px" }}
              />
              <button onClick={() => setMainImg("")}>
                <FaTrashCan />
              </button>
            </div>
          )}
        </div>
        <h4>Այլ նկարներ</h4>
        <div className="another-images">
          <input
            type="file"
            id="add-image"
            accept="image/*"
            multiple
            onChange={(evn) => {
              const fileList = evn.target.files;
              const newImages = Array.from(fileList).map((file) =>
                URL.createObjectURL(file)
              );
              setAnotherImgs((prevImages) => [...prevImages, ...newImages]);
              console.log(anotherImgs);
            }}
          />
          <div className="add-image">
            <label htmlFor="add-image">Ավելացնել նկար +</label>
          </div>
          <div className="an-images">
            {anotherImgs.map((image, index) => (
              <div className="item-image">
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  width={"100%"}
                  height={"250px"}
                  style={{ objectFit: "cover", borderRadius: "7px" }}
                />
                <button
                  onClick={(evn) => {
                    evn.preventDefault();
                    setAnotherImgs(anotherImgs.filter((el) => el !== image));
                  }}
                >
                  <FaTrashCan />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="add-item-btn" type="submit">
          Ավելացնել գույք
          <FaClipboardCheck />
        </button>
      </form>
      <AdderData />
    </div>
  );
};

export default AddItem;
