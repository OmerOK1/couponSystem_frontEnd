import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginResponseModel } from "../../../Models/LoginResponseModel";
import { LoginRequestModel } from "../../../Models/LoginRequestModel";
import { loginApi } from "../../../WebApi/LoginApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/AuthAppState";
import { ClientType } from "../../../Models/ClientType";
import React, { useState } from "react";

function Login(): JSX.Element {
  const [inTimeout, setInTimeout] = useState(false);
  const navigate = useNavigate();

  const loginTimer = (hours: number) => {
    setTimeout(() => {
      navigate("/logout");
    }, 1000 * 3600 * hours);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .lowercase()
      .required("please enter your email address")
      .matches(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "just enter a real email, we don't really know how this works. thanks."
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        "must contain at least one uppercase letter, one lowercase letter, and one digit (0-9), 8-20 characters long, thank you! :)"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginRequestModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  
  const loginFromServer = async (loginRequest: LoginRequestModel) => {
    if (inTimeout) {return;}
    setInTimeout(true);

    await loginApi(loginRequest)
      .then((res) => {
        notify.success(SccMsg.LOGIN_SUCCESS);
        loginTimer(0.5);
        store.dispatch(loginAction(res.data));
        navigate("/");
      })
      .catch((err) => {
        notify.error(err);
      });
      setInTimeout(false);
      
  };

  return (
    <div className="Login flex-center-col">
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit(loginFromServer)}
        className="login_form flex-center-col"
      >
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="email@example.JB"
          id="email"
        />
        <span className="validation_rules">{errors.email?.message}</span>
        <br />
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          id="password"
        />

        <span className="validation_rules">{errors.password?.message}</span>
        <br />
        <select {...register("clientType")}
          name="clientType"
          id="clientType"
          placeholder="clientType">
          <option value="clientType" disabled>
            Client Type
          </option>
          <option value={ClientType.ADMINISTRATOR}>Admin</option>
          <option value={ClientType.COMPANY}>Company</option>
          <option value={ClientType.CUSTOMER}>Customer</option>
        </select>
        <span>{errors.clientType?.message}</span>
        <br />
        <button className="button-success" disabled={!isValid}>
            Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
