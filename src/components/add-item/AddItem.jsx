import React, { useState } from "react";
import "./add-item.css";
import { FaImage } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FcPicture } from "react-icons/fc";
import AdderData from "../adder-data/AdderData";
import { useForm } from "react-hook-form";

const AddItem = ({type}) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [mainImg, setMainImg] = useState("");
  const [anotherImgs, setAnotherImgs] = useState([]);
  const [rentOrSell, setRentOrSell] = useState(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('mainImg', data.mainImage);
    console.log(formData)
  }

  return (  
    <div className="add-item">
      <form className="add-item-panel" onSubmit={handleSubmit(onSubmit)}>
        <div className="select-item-panel">
          <h4>Հայտարարության տեսակ</h4>
          <div className="item-type-panel">
            <label className="item-type" onClick={() => setRentOrSell(0)}>
              <span>Վաճառք</span>
              <input
                type="radio"
                value={0}
                {...register("type", { required: true })}
              />
            </label>
            <label className="item-type" onClick={() => setRentOrSell(1)}>
              <span>Վարձակալություն</span>
              <input
                type="radio"
                value={1}
                {...register("type", { required: true })}
              />
            </label>
            <label className="item-type" onClick={() => setRentOrSell(2)}>
              <span>Վարձակալություն և վաճառք</span>
              <input
                type="radio"
                value={2}
                {...register("type", { required: true })}
              />
            </label>
          </div>
          {errors.type && (
            <p className="error-message">Ընտրեք հայտարարության տեսակը</p>
          )}
        </div>
        <div className="select-item-panel">
          <h4>Գույքի տեսակ</h4>
          <div className="item-type-panel">
            <label className="item-type">
              <span>Բնակարան</span>
              <input
                type="radio"
                {...register("itemType", { required: true })}
              />
            </label>
            <label className="item-type">
              <span>Առանձնատուն</span>
              <input
                type="radio"
                {...register("itemType", { required: true })}
              />
            </label>
            <label className="item-type">
              <span>Կոմերցիոն</span>
              <input
                type="radio"
                {...register("itemType", { required: true })}
              />
            </label>
            <label className="item-type">
              <span>Հողատարածք</span>
              <input
                type="radio"
                {...register("itemType", { required: true })}
              />
            </label>
          </div>
        </div>
        {errors.itemType && (
          <p className="error-message">Ընտրեք գույքի տեսակը</p>
        )}
        <hr />
        <div className="item-headers">
          <div className="header-inpts">
            <input
              placeholder="Գույքի անվանումը ՝ Հայերեն"
              {...register("itemNameArm")}
            />
            <textarea
              placeholder="Գույքի նկարագրությունը ՝ Հայերեն"
              {...register("itemDesArm")}
            ></textarea>
          </div>
          <hr />
          <div className="header-inpts">
            <input
              placeholder="Գույքի անվանումը ՝ Ռուսերեն"
              {...register("itemNameRu")}
            />
            <textarea
              placeholder="Գույքի նկարագրությունը ՝ Ռուսերեն"
              {...register("itemDesRu")}
            ></textarea>
          </div>
          <hr />
          <div className="header-inpts">
            <input
              placeholder="Գույքի անվանումը ՝ Անգլերեն"
              {...register("itemNameEn")}
            />
            <textarea
              placeholder="Գույքի նկարագրությունը ՝ Անգլերեն"
              {...register("itemDesEn")}
            ></textarea>
          </div>
        </div>
        {rentOrSell === 1 || rentOrSell === 2 ? (
          <div className="price">
            <div className="item-price">
              <input
                placeholder="Վարձի արժեքը ՝ Դրամով"
                type="number"
                {...register("itemRentPriceDram", { required: true })}
              />
              <div className="symbol">
                <b>֏</b>
              </div>
            </div>
            <div className="item-price">
              <input
                placeholder="Վարձի արժեքը ՝ Ռուբլով"
                type="number"
                {...register("itemRentPriceRub", { required: true })}
              />
              <div className="symbol">
                <b>₽</b>
              </div>
            </div>
            <div className="item-price">
              <input
                placeholder="Վարձի արժեքը ՝ Դոլլարով"
                type="number"
                {...register("itemRentPriceUsd", { required: true })}
              />
              <div className="symbol">
                <b>$</b>
              </div>
            </div>
          </div>
        ) : null}
        {(errors.itemRentPriceDram ||
          errors.itemRentPriceRub ||
          errors.itemRentPriceUsd) && (
          <p className="error-message">Լրացրեք բոլոր դաշտերը</p>
        )}
        {rentOrSell === 0 || rentOrSell === 2 ? (
          <div className="price">
            <div className="item-price">
              <input
                placeholder="Գույքի արժեքը ՝ Դրամով"
                type="number"
                {...register("itemSellPriceUsd", { required: true })}
              />
              <div className="symbol">
                <b>֏</b>
              </div>
            </div>
            <div className="item-price">
              <input
                placeholder="Գույքի արժեքը ՝ Ռուբլով"
                type="number"
                {...register("itemSellPriceUsd", { required: true })}
              />
              <div className="symbol">
                <b>₽</b>
              </div>
            </div>
            <div className="item-price">
              <input
                placeholder="Գույքի արժեքը ՝ Դոլլարով"
                type="number"
                {...register("itemSellPriceUsd", { required: true })}
              />
              <div className="symbol">
                <b>$</b>
              </div>
            </div>
          </div>
        ) : null}
        {(errors.itemSellPriceDram ||
          errors.itemSellPriceRub ||
          errors.itemSellPriceUsd) && (
          <p className="error-message">Լրացրեք բոլոր դաշտերը</p>
        )}
        <hr />
        <div className="item-area">
          <input
            placeholder="Գույքի մակերեսը"
            type="number"
            {...register("itemArea", { required: true })}
          />
        </div>
        {errors.itemArea && (
          <p className="error-message">Գրեք գույքի մակերեսը</p>
        )}
        <input
          {...register('mainImage')}
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
            {...register('allImages')}
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
      {type !== 'Broker' && <AdderData />}
    </div>
  );
};

export default AddItem;
