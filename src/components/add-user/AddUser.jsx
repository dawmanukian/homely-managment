import React from "react";
import "./add-user.css";
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";

const AddUser = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="add-user">
      {/* <h1>Ավելացնել Օգտանուն <FiUserPlus /></h1> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder={"Անուն"}
          {...register("userName", { required: true })}
          className="add-inpt"
        />
        <input
          placeholder={"Ազգանուն"}
          {...register("surName", { required: true })}
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
              {...register("accountType", {
                required: true,
              })}
            />
            <span>Գործակալ</span>
          </label>
          <label htmlFor="type_manager">
            <input
              id="type_manager"
              type="radio"
              {...register("accountType", {
                required: true,
              })}
            />
            <span>Մենեջեր</span>
          </label>
          <label htmlFor="type_admin">
            <input
              id="type_admin"
              type="radio"
              {...register("accountType", {
                required: true,
              })}
            />
            <span>Ադմին</span>
          </label>
        </div>
        <button>Ավելացնել</button>
      </form>
    </div>
  );
};

export default AddUser;
