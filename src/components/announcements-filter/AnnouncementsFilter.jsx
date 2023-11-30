import React from "react";
import "./announcements-filter.css";
import { useForm } from "react-hook-form";

const AnnouncementsFilter = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="announcements-filter">
      <form className="filters" onSubmit={handleSubmit(onSubmit)}>
        <div className="filter-inputs">
          <input placeholder="Որոնել..." className="filter-search-inpt" />
          <div className="inpts-panel">
            <input placeholder="Գին սկսած" className="filter-search-inpt" />
            <input placeholder="Գին մինչև" className="filter-search-inpt" />
            <input placeholder="Մակերես" className="filter-search-inpt" />
          </div>
        </div>
        <hr />
        <div className="item-type-panel">
          <label htmlFor="item-type-sell" className="item-type-label">
            <span>Վաճառք</span>
            <input type="radio" id="item-type-sell" {...register("itemType")} />
          </label>
          <label htmlFor="item-type-rent" className="item-type-label">
            <span>Վարձակալություն</span>
            <input type="radio" id="item-type-rent" {...register("itemType")} />
          </label>
          <label htmlFor="new-building" className="item-type-label">
            <span>Նորակառույց</span>
            <input
              type="checkbox"
              id="new-building"
              {...register("itemType")}
            />
          </label>
          <div className="select-region">
            <select>
              <option>Երևան</option>
              <option>Երևան</option>
              <option>Երևան</option>
            </select>
          </div>
        </div>
        <div className="announcement-filters">
          <label htmlFor="announcement-type-flat">
            Բնակարան
            <input type="checkbox" id="announcement-type-flat" />
          </label>
          <label htmlFor="announcement-type-earth">
            Հողատարածք
            <input type="checkbox" id="announcement-type-earth" />
          </label>
          <label htmlFor="announcement-type-commercial">
            Կոմերցիոն
            <input type="checkbox" id="announcement-type-commercial" />
          </label>
          <label htmlFor="announcement-type-mansion">
            Առանձնատուն
            <input type="checkbox" id="announcement-type-mansion" />
          </label>
        </div>
        <hr />
        <div className="announcement-filters">
          <label htmlFor="announcement-type-panel">
            Պանելային
            <input type="checkbox" id="announcement-type-panel" />
          </label>
          <label htmlFor="announcement-type-stone">
            Քարե
            <input type="checkbox" id="announcement-type-stone" />
          </label>
          <label htmlFor="announcement-type-other">
            Այլ
            <input type="checkbox" id="announcement-type-other" />
          </label>
        </div>
        <hr />
        <div className="announcement-filters">
          <label htmlFor="announcement-status-panel">
            Զրոյական
            <input type="checkbox" id="announcement-status-panel" />
          </label>
          <label htmlFor="announcement-status-stone">
            Լավ
            <input type="checkbox" id="announcement-status-stone" />
          </label>
          <label htmlFor="announcement-status-other">
            Վերանորոգված
            <input type="checkbox" id="announcement-status-other" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementsFilter;
