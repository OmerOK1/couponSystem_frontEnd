import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addCustomerApi, getCustomerApi } from "../../../WebApi/AdminApi";
import { ClientType } from "../../../Models/ClientType";
import { CustomerModel } from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { addCustomerAction } from "../../../Redux/CustomerState";
import CustomerInfoCard from "../../SharedArea/Cards/CustomerInfoCard/CustomerInfoCard";

export default function GetCustomer() {
  const requiredType = ClientType.ADMINISTRATOR; // TODO: this can be changed to make generic for customer get self info
  const navigate = useNavigate();
  const params = useParams();
  const customerId = +(params.id );

  const [customer, setCustomer] = useState<CustomerModel>(
    store
      .getState()
      .customerReducer.customers.find((customer) => customer.id === customerId) 
  );
  const getCustomerFromServer = async () => {
    await getCustomerApi(customerId)
    .then((res) => {
        notify.success(SccMsg.CUSTOMER_FETCH_ONE_SUCCESS);
        store.dispatch(addCustomerAction(res.data));
        setCustomer(res.data);
      })

      .catch((error) => {
        notify.error(error);
        navigate("/customers"); //TODO
      });
  };
  (function () {
    if (customer === undefined) {
      getCustomerFromServer();
    }
  })();

  useEffect(() => {
    if (!store.getState().authReducer.user.token) {
      notify.error(ErrMsg.NO_TOKEN);
      navigate("/login");
    }
    if (!(store.getState().authReducer.user.clientType === requiredType)) {
      notify.error(ErrMsg.UNAUTHORIZED_ACTION);
      navigate("/login");
    }
  }, []);

  

  return (
    <>
    {
      customer ? 
      <CustomerInfoCard customer={customer} to={"/customers/view/" + customerId} />
       : 
       <span>oops, there's a problem getting your information</span>
    }
      
    </>
  );
}