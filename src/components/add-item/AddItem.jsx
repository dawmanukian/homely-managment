import React from "react";
import "./add-item.css";

const AddItem = () => {
  return (
    <div className="add-item">
      <form className="add-item-panel">
        <div className="select-item-panel">
          <h4>Հայտարարության տեսակ</h4>
          <div className="item-type-panel">
            <label className="item-type">
              <span>Վաճառք</span>
              <input type="radio" name='type'/>
            </label>
            <label className="item-type">
              <span>Վարձակալություն</span>
              <input type="radio" name='type'/>
            </label>
          </div>
        </div>
        <div className="select-item-panel">
          <h4>Գույքի տեսակ</h4>
          <div className="item-type-panel">
            <label className="item-type">
              <span>Բնակարան</span>
              <input type="radio" name='item-type'/>
            </label>
            <label className="item-type">
              <span>Առանձնատուն</span>
              <input type="radio" name='item-type'/>
            </label>
            <label className="item-type">
              <span>Կոմերցիոն</span>
              <input type="radio" name='item-type'/>
            </label>
            <label className="item-type">
              <span>Հողատարածք</span>
              <input type="radio" name='item-type'/>
            </label>
          </div>
        </div>
        <hr />
        <div className="item-headers">
          <div className="header-inpts">
            <input placeholder="Գույքի անվանումը ՝ Հայերեն"/>
            <textarea placeholder="Գույքի նկարագրությունը ՝ Հայերեն"></textarea>
          </div>
          <hr />
          <div className="header-inpts">
            <input placeholder="Գույքի անվանումը ՝ Ռուսերեն"/>
            <textarea placeholder="Գույքի նկարագրությունը ՝ Ռուսերեն"></textarea>
          </div>
          <hr />
          <div className="header-inpts">
            <input placeholder="Գույքի անվանումը ՝ Անգլերեն"/>
            <textarea placeholder="Գույքի նկարագրությունը ՝ Անգլերեն"></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
