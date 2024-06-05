import React, { useState } from "react";
import "./add-user.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddUser = () => {
  const api_url = process.env.REACT_APP_BACKEND_URL;

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [showLoading, setShowLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setShowLoading(true);
    try {
      const res = await axios.post(
        `https://service.homely.am/api/admin/create/user`,
        data
      );
      setSuccess(res.data.success);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className="add-user">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder={"Անուն"}
          {...register("username", { required: true })}
          className="add-inpt"
        />
        <input
          placeholder={"Ազգանուն"}
          {...register("surname", { required: true })}
          className="add-inpt"
        />
        <input
          placeholder={"Հեռախոսահամար"}
          {...register("phone", { required: true })}
          className="add-inpt"
        />
        <input
          placeholder={"Էլ․ հասցե"}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            },
          })}
          className="add-inpt"
        />
        <div className="acc_type">
          <label htmlFor="type_broker">
            <input
              id="type_broker"
              type="radio"
              value={"broker"}
              {...register("type", {
                required: true,
              })}
            />
            <span>Գործակալ</span>
          </label>
          <label htmlFor="type_manager">
            <input
              id="type_manager"
              value={"manager"}
              type="radio"
              {...register("type", {
                required: true,
              })}
            />
            <span>Մենեջեր</span>
          </label>
          <label htmlFor="type_admin">
            <input
              id="type_admin"
              value={"admin"}
              type="radio"
              {...register("type", {
                required: true,
              })}
            />
            <span>Ադմին</span>
          </label>
        </div>
        <button type="submit">
          {showLoading ? <span className="loader"></span> : "Ավելացնել"}
        </button>
        {success && <p style={{ color: "green" }}>Օգտանունը ավելացվել է</p>}
      </form>
    </div>
  );
};

export default AddUser;
