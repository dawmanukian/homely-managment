import "./card-page.css";
import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import ImagesSwiper from "../../components/images-swiper/ImagesSwiper";
import { FaArrowLeftLong, FaHeart, FaLocationDot } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { TbStairsUp } from "react-icons/tb";
import { TbDimensions } from "react-icons/tb";
import { FaShower } from "react-icons/fa";
import { FaBed } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import axios from "axios";

const ItemPage = () => {
  const { itemId } = useParams();
  const [data, setData] = useState([]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const get_item_data = async () => {
      try {
        const { data } = await axios.get(
          `https://service.homely.am/api/item/get?itemId=${itemId}`
        );
        setData(() => data.data);
        setAllImages(data.item_images);
      } catch (error) {
        console.log(error);
      }
    };
    get_item_data();
  }, []);

  const [showSwiper, setShowSwiper] = useState(false);
  const liked = localStorage.getItem("liked");

  return (
    <>
      {/* {showSwiper && (
        <div className="img-swiper-panel">
          <div className="btn-div">
            <button
              className="close-swiper-btn"
              onClick={() => setShowSwiper(false)}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div style={{ zIndex: "10", width: "100%" }}>
            <ImagesSwiper images={allImages} />
          </div>
        </div>
      )} */}
      <div className="card-page">
        <div>
          {data.map((el) => {
            return (
              <>
                <div className="card-page-data" key={el.id}>
                  <span className="card-add-date"></span>
                  <div className="item_information">
                    <div
                      style={{ display: "grid", gap: "15px", width: "100%" }}
                    >
                      <div className="card-title-panel">
                        <div className="card-header">
                          <p className="card-title-pg">{el.title}</p>
                        </div>
                      </div>
                      <div className="card__page_header">
                        <b className="page_card-price">$ {el.price}</b>
                        <div className={el.proposal}>
                          {el.proposal !== "null" &&
                            (el.proposal === "special"
                              ? "Հատուկ"
                              : "Էքսկլյուզիվ")}
                        </div>
                        <div
                          className="card-type"
                          style={{ background: "green" }}
                        >
                          {el.type === "rent" ? "Վարձակալություն" : "Վաճառք"}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div className="icon-div">
                          <TbStairsUp />
                          <span>
                            {el.floor} / {el.number_of_floors}
                          </span>
                        </div>
                        <div className="icon-div">
                          <FaBed />
                          <span>{el.number_of_rooms}</span>
                        </div>
                        <div className="icon-div">
                          <TbDimensions />
                          <span>
                            {el.area} {" ք․մ"}
                          </span>
                        </div>
                        <div className="icon-div">
                          <FaShower />
                          <span>{el.number_of_bathrooms}</span>
                        </div>
                        <div className="icon-div">
                          <p>ID {el.id}</p>
                        </div>
                      </div>
                      <span className="card_page_street">
                        <FaLocationDot /> {el.street}
                      </span>
                      <h2>Նկարագրություն</h2>
                      <div className="card-description">
                        <p>{el.description}</p>
                        <hr />
                        <p>{el.description_hidden}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "35px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "25px" }}>
                          <div className="des_about">
                            <div className="des_block">
                              <span>Շրջան</span>
                              <b>{el.region}</b>
                            </div>
                            {/* <div className="des_block">
                              <span>Շենքի տիպը</span>
                              <b>{el.type_of_building}</b>
                            </div> */}
                            <div className="des_block">
                              <span>Կարգավիճակ</span>
                              <b>{el.status}</b>
                            </div>
                            <div className="des_block">
                              <span>Պատշգամբ</span>
                              <b>{el.balcony}</b>
                            </div>
                            <div className="des_block">
                              <span>Կահույք</span>
                              <b>{el.furniture}</b>
                            </div>
                          </div>
                        </div>
                        <div>
                          {el.conveniences.map((e) => {
                            return (
                              <div style={{ marginBottom: "5px" }}>
                                <b>
                                  <FaCircleCheck style={{ color: "green" }} />{" "}
                                  {e}
                                </b>
                              </div>
                            );
                          })}
                          <br />
                          {el.facilities_in_the_building.map((e) => {
                            return (
                              <div style={{ marginBottom: "5px" }}>
                                <b>
                                  <FaCircleCheck style={{ color: "green" }} />{" "}
                                  {e}
                                </b>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {el.video_url && (
                  <iframe
                    className="youtube_video"
                    width="600"
                    height="315"
                    src={el.video_url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )} */}
              </>
            );
          })}
          <div
            id="images_id"
          >
            {allImages.map((el) => {
              return (
                <img
                  src={`https://service.homely.am/storage/images/${el.image}`}
                  height={"413px"}
                  className="itm-img"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPage;
