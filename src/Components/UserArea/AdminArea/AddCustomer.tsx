import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientType } from "../../../Models/ClientType";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CustomerModel } from "../../../Models/CustomerModel";
import { yupResolver } from "@hookform/resolvers/yup";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { CompanyModel } from "../../../Models/CompanyModel";
import { addCompanyAction } from "../../../Redux/CompanyState";
import { addCompanyApi, addCustomerApi } from "../../../WebApi/AdminApi";
import { addCustomerAction } from "../../../Redux/CustomerState";

function AddCustomer() {
  const requiredType = ClientType.ADMINISTRATOR;
  const navigate = useNavigate();
  const [inTimeout, setInTimeout] = useState(false);

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .lowercase()
      .required("customer name is required, please enter first name"),
    lastName: yup.string().lowercase().required("please enter last name"),
    email: yup
      .string()
      .lowercase()
      .required("please enter the customer's email address")
      .matches(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "just enter a real email, we don't really know how this copy-pasted-from-StackOverFlow-regex works. thanks."
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        "must contain at least one uppercase letter, one lowercase letter, and one digit (0-9), 8-20 characters long, thank you! :)"
      ),
  });

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = 
  useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) });

  useEffect(()=>{
      if (!store.getState().authReducer.user.token){
          notify.error(ErrMsg.NO_TOKEN);
          navigate("/login");
      }
      if (!(store.getState().authReducer.user.clientType === requiredType)){
          notify.error(ErrMsg.UNAUTHORIZED_ACTION);
          navigate("/login");
      }
  },[])
  
  const addCustomer = async (company: CompanyModel)=> {
    if (inTimeout) {return;}
    setInTimeout(true);
      await addCustomerApi(company).then((res)=>{
          notify.success(SccMsg.CUSTOMER_CREATE_SUCCESS);
          store.dispatch(addCustomerAction(res.data));
          navigate("/customers"); 
      })
      .catch ((error)=>{
          notify.error(error);
      })
      setInTimeout(false);
      
  }

  return <div>
    <h1>Add New Customer</h1>
            {/* Step 9 - handleSubmit your form  */}

            <form onSubmit={handleSubmit(addCustomer)} className="add_customer_form flex-center-col">
                <label htmlFor="firstName">First Name</label>
                <input {...register("firstName",)} type="firstName" placeholder= "Moshe" id="firstName" />
                <span className="validation_rules">{errors.firstName?.message}</span>
                <br />

                <label htmlFor="lastName">Last Name</label>
                <input {...register("lastName",)} type="lastName" placeholder= "Moshe" id="lastName" />
                <span className="validation_rules">{errors.lastName?.message}</span>
                <br />

                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" placeholder="email@example.JB" id="email" />
                <span className="validation_rules">{errors.email?.message}</span>
                <br />

                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span className="validation_rules">{errors.password?.message}</span>
                <br />

                <button className="button-success" disabled={!isValid}>Create Now</button>
            </form>
  </div>;
}

export default AddCustomer;
