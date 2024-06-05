import React from "react";
import "./select-street-panel.css";
import all_streets from "../../streets.json";

const SelectStreetPanel = ({ streetName, onSelect }) => {
  const streets = all_streets.content.filter((el) => {
    return (
      el.titleHy.toLowerCase().startsWith(streetName.toLowerCase()) ||
      el.titleEn.toLowerCase().startsWith(streetName.toLowerCase())
    );
  });
  return (
    <div className="streets-panel">
      {streets.length ? (
        streets.map((el, index) => {
          return (
            <div
              className="street-name"
              key={index}
              onClick={() => onSelect(el.titleHy)}
            >
              <span>{el.titleHy}</span>
              <span style={{ color: "gray", marginLeft: "10px" }}>
                {el.districtHy}
              </span>
            </div>
          );
        })
      ) : (
        <div className="street-name">
          <p>Ոչինչ չի գտնվել</p>
        </div>
      )}
    </div>
  );
};

export default SelectStreetPanel;
