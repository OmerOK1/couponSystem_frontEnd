import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { logoutAction } from "../../../Redux/AuthAppState";
import "./Logout.css";
import notify, { SccMsg } from "../../../Services/Notification";
import {
  clearCompaniesAction,
  clearCouponAction,
} from "../../../Redux/CompanyState";
import {
  clearCustomerCouponAction,
  clearCustomersAction,
  clearCouponAction as clearCouponActionFromCustomer,
} from "../../../Redux/CustomerState";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  });

  const logout = () => {
    notify.success(SccMsg.LOGOUT_SUCCESS);

    store.dispatch(logoutAction());
    store.dispatch(clearCompaniesAction());
    store.dispatch(clearCustomersAction());
    store.dispatch(clearCustomerCouponAction());
    store.dispatch(clearCouponAction());
    store.dispatch(clearCouponActionFromCustomer());

    navigate("/login");
  };

  return <></>;
}

export default Logout;
