import { useLocation, useNavigate } from "react-router-dom";
import { ClientType } from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import MenuLink from "../../TempArea/RoutingArea/MenuLink/MenuLink";
import "./Menu.css";

function Menu(): JSX.Element {
  const navigation = useNavigate();
  const type = store.getState().authReducer.user.clientType;
  //const location = useLocation();
  //const isRoot = location.pathname === "/";

  return (
    <div className="Menu flex-col-top-center">
      <h1>Menu</h1>
      {type === "ADMINISTRATOR" && (
        <CustomLink to="/companies">Companies</CustomLink>
      )}
      {type === "ADMINISTRATOR" && (
        <CustomLink to="/customers">Customers</CustomLink>
       )}
      {type === ClientType.COMPANY && (
        <CustomLink to="/company/coupons">Coupons</CustomLink>
      )}
      {/* {type === ClientType.COMPANY && (
        <CustomLink to="/company/coupon/add">Add new Coupon</CustomLink>
      )} */}
      {type === ClientType.COMPANY && (
        <CustomLink to="/company/view">profile</CustomLink>
      )}
      {type === ClientType.CUSTOMER && (
        <CustomLink to="/customer/view">profile</CustomLink>
      )}
      {type === ClientType.CUSTOMER && (
        <CustomLink to="/customer/coupons">find coupons</CustomLink>
      )}
      {type === ClientType.CUSTOMER && (
        <CustomLink to="/customer/coupons/owned">my coupons</CustomLink>
      )}
       
    </div>
  );
}

export default Menu;
