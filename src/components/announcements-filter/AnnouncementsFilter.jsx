import React, { useState } from "react";
import "./announcements-filter.css";
import { useForm } from "react-hook-form";
import {
  FaLocationDot,
  FaBuilding,
  FaBed,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";

const AnnouncementsFilter = () => {
  const { register, handleSubmit } = useForm();

  const [openPanelNum, setOpenPanelNum] = useState(null);
  const [showMorePanel, setShowMorePanel] = useState(false);

  const [streetName, setStreetName] = useState("");
  const [regionName, setRegionName] = useState([]);
  const [selectedStreet, setSelectedStreet] = useState(null);

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <>
      <div className="home-filters">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rent-or-sell-panel">
            <div className="rent-or-sell">
              <input
                type="radio"
                value="sell"
                id="radio-sell"
              />
              <label htmlFor="radio-sell">{"Վաճառք"}</label>
              <input
                type="radio"
                value="rent"
                id="radio-rent"
              />
              <label htmlFor="radio-rent">{"Վարձակալություն"}</label>
              <input
                type="number"
                placeholder={"Հեռ․ համար"}
                className="search-id"
              />
            </div>
          </div>
          <div className="all-filters">
            {openPanelNum && (
              <div
                onClick={() => setOpenPanelNum(null)}
                style={{
                  height: "100%",
                  width: "100%",
                  position: "fixed",
                  zIndex: "6",
                }}
              ></div>
            )}
            <div className="fill-div" onClick={() => setOpenPanelNum(3)}>
              <div className="fill-name">
                <FaBuilding className="fill-icon" />
                {"Գույքի տիպը"}
              </div>
              <div className={`filter-panel ${openPanelNum === 3 && "active"}`}>
                <div>
                  <input type="checkbox" id="flat" value={"flat"} />
                  <label className="filter-check" htmlFor="flat">
                    <span>{"Բնակարան"}</span>
                  </label>
                  <input type="checkbox" id="hause" value={"hause"} />
                  <label className="filter-check" htmlFor="hause">
                    <span>{"Առանձնատուն"}</span>
                  </label>
                  <input type="checkbox" id="commercion" value={"commercion"} />
                  <label className="filter-check" htmlFor="commercion">
                    <span>{"Կոմերցիոն"}</span>
                  </label>
                  <input type="checkbox" id="land_plot" value={"landPlot"} />
                  <label className="filter-check" htmlFor="land_plot">
                    <span>{"Հողատարածք"}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="fill-div" onClick={() => setOpenPanelNum(1)}>
              <div className="fill-name">
                <FaLocationDot className="fill-icon" />
                {"Համայնք"}
              </div>
              <div
                className={`filter-panel regions ${
                  openPanelNum === 1 && "active"
                }`}
              >
                <div>
                  <input
                    type="checkbox"
                    id="arabkir"
                    value={"Արաբկիր"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="arabkir">
                    <span>{"Արաբկիր"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="avan"
                    value={"Ավան"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="avan">
                    <span>{"Ավան"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="davtashen"
                    value={"Դավթաշեն"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="davtashen">
                    <span>{"Դավթաշեն"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="zeytun"
                    value={"Զեյթուն"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="zeytun">
                    <span>{"Զեյթուն"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="kentron"
                    value={"Կենտրոն"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="kentron">
                    <span>{"Կենտրոն"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="shengavit"
                    value={"Շենգավիթ"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="shengavit">
                    <span>{"Շենգավիթ"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="nork-marash"
                    value={"Նորք-Մարաշ"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="nork-marash">
                    <span>{"Նորք-Մարաշ"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="nor-nork"
                    value={"Նոր Նորք"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="nor-nork">
                    <span>{"Նոր Նորք"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="nubarashen"
                    value={"Նուբարաշեն"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="nubarashen">
                    <span>{"Նուբարաշեն"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="erebuni"
                    value={"Էրեբունի"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="erebuni">
                    <span>{"Էրեբունի"}</span>
                  </label>
                  <input
                    type="checkbox"
                    id="malatia-sebastia"
                    value={"Մալաթիա-Սեբաստիա"}
                    onChange={(evn) =>
                      setRegionName([...regionName, evn.target.value])
                    }
                  />
                  <label className="filter-check" htmlFor="malatia-sebastia">
                    <span>{"Մալաթիա-Սեբաստիա"}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="fill-div" onClick={() => setOpenPanelNum(2)}>
              <div className="fill-name">
                <FaBed className="fill-icon" />
                {"Սենյակներ"}
              </div>
              <div
                className={`filter-panel regions ${
                  openPanelNum === 2 && "active"
                }`}
              >
                <div>
                  <input
                    type="checkbox"
                    id="rooms_1"
                    value={"1"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_1">
                    <span>1</span>
                  </label>
                  <input
                    type="checkbox"
                    id="rooms_2"
                    value={"2"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_2">
                    <span>2</span>
                  </label>
                  <input
                    type="checkbox"
                    id="rooms_3"
                    value={"3"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_3">
                    <span>3</span>
                  </label>
                  <input
                    type="checkbox"
                    id="rooms_4"
                    value={"4"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_4">
                    <span>4</span>
                  </label>
                  <input
                    type="checkbox"
                    id="rooms_5"
                    value={"5"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_5">
                    <span>5</span>
                  </label>
                  <input
                    type="checkbox"
                    id="rooms_6"
                    value={"6"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_6">
                    <span>6</span>
                  </label>
                  <input
                    type="checkbox"
                    id="rooms_7"
                    value={"7"}
                    {...register("roomsNumber")}
                  />
                  <label className="filter-check" htmlFor="rooms_7">
                    <span>7+</span>
                  </label>
                </div>
              </div>
            </div>
            <div
              className={`fill-div ${showMorePanel && "opened"}`}
              onClick={() => setShowMorePanel(!showMorePanel)}
            >
              {"Տեսնել ավելին"}{" "}
              {showMorePanel ? (
                <FaChevronUp style={{ marginLeft: "10px" }} />
              ) : (
                <FaChevronDown style={{ marginLeft: "10px" }} />
              )}
            </div>
            <button className="search-btn" type="submit">
              {"Որոնել"}
            </button>
          </div>
          {showMorePanel && (
            <div className="more-panel">
              <div className="first-panel">
                <div className="panel-box">
                  <div className="id-panel">
                    <b>ID</b>
                  </div>
                  <input
                    type="number"
                    placeholder={"Որոնել"}
                    className="search-id"
                    {...register("id")}
                  />
                </div>
                <div className="address-panel-div">
                  <input
                    type="text"
                    placeholder={"Հասցե"}
                    className="search-id"
                    value={streetName}
                    onChange={(evn) => {
                      setStreetName(evn.target.value);
                      selectedStreet && setSelectedStreet(null);
                    }}
                  />
                </div>
                <div className="floor-data">
                  <input
                    type="number"
                    placeholder={"Հարկ մին․"}
                    className="search-floor"
                    min={1}
                    {...register("floor_min")}
                  />
                  <input
                    type="number"
                    placeholder={"Հարկ մակս․"}
                    className="search-floor"
                    min={1}
                    {...register("floor_max")}
                  />
                </div>
              </div>
              <div className="first-panel two">
                <div style={{ width: "100%", display: "flex", gap: "15px" }}>
                  <div className="floor-data prc" style={{ display: "flex" }}>
                    <input
                      type="number"
                      placeholder={"Գին սկսած"}
                      className="search-floor"
                      min={0}
                      {...register("price_from")}
                    />
                    <input
                      type="number"
                      placeholder={"Գին մինչև"}
                      className="search-floor"
                      min={0}
                      {...register("price_to")}
                    />
                  </div>
                  <div className="floor-data prc" style={{ display: "flex" }}>
                    <input
                      type="number"
                      placeholder={"Մին ք․մ"}
                      className="search-floor"
                      min={0}
                      {...register("area_from")}
                    />
                    <input
                      type="number"
                      placeholder={"Մակս ք․մ"}
                      className="search-floor"
                      min={0}
                      {...register("area_to")}
                    />
                  </div>
                </div>

                <div className="checks-panels">
                  <div className="checks-div">
                    <b>{"Շենքի տիպը"}</b>
                    <div className="checks-div-panel">
                      <input
                        type="checkbox"
                        id="panel"
                        value={"panel"}
                        {...register("building_type")}
                      />
                      <label className="custom-check" htmlFor="panel">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Պանելային"}</span>
                      </label>
                      <input
                        type="checkbox"
                        id="stone"
                        value={"stone"}
                        {...register("building_type")}
                      />
                      <label className="custom-check" htmlFor="stone">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Քարե"}</span>
                      </label>
                      <input
                        type="checkbox"
                        id="monolith"
                        value={"monolith"}
                        {...register("building_type")}
                      />
                      <label className="custom-check" htmlFor="monolith">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Մոնոլիտ"}</span>
                      </label>
                      <input
                        type="checkbox"
                        id="other"
                        value={"other"}
                        {...register("building_type")}
                      />
                      <label className="custom-check" htmlFor="other">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Նորակառույց"}</span>
                      </label>
                    </div>
                  </div>
                  <div className="checks-div">
                    <b>{"Կարգավիճակ"}</b>
                    <div className="checks-div-panel">
                      <input
                        type="checkbox"
                        id="renovated"
                        value={"renovated"}
                        {...register("status")}
                      />
                      <label className="custom-check" htmlFor="renovated">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Վերանորոգված"}</span>
                      </label>
                      <input
                        type="checkbox"
                        id="good"
                        value={"good"}
                        {...register("status")}
                      />
                      <label className="custom-check" htmlFor="good">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Լավ"}</span>
                      </label>
                      <input
                        type="checkbox"
                        id="null"
                        value={"null"}
                        {...register("status")}
                      />
                      <label className="custom-check" htmlFor="null">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Զրոյական"}</span>
                      </label>
                      <input
                        type="checkbox"
                        id="new"
                        value={"new"}
                        {...register("status")}
                      />
                      <label className="custom-check" htmlFor="new">
                        <div>
                          <FaCheck className="check-icons" />
                        </div>
                        <span>{"Դիզայներական ոճ"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AnnouncementsFilter;
