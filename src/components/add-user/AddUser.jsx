import React from "react";
import "./add-user.css";
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";
import axios from "axios";

const AddUser = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    try {
      axios.post('http://127.0.0.1:8000/api/admin/create/user', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-user">
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
              value={'broker'}
              {...register("accountType", {
                required: true,
              })}
            />
            <span>Գործակալ</span>
          </label>
          <label htmlFor="type_manager">
            <input
              id="type_manager"
              value={'manager'}
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
              value={'admin'}
              type="radio"
              {...register("accountType", {
                required: true,
              })}
            />
            <span>Ադմին</span>
          </label>
        </div>
        <button type="submit">Ավելացնել</button>
      </form>
    </div>
  );
};

export default AddUser;
