import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import * as yup from "yup";
// import { addCouponApi, getCouponApi } from "../../../WebApi/CompanyApi";
// import { CouponModel } from "../../../Models/CouponModel";
// import store from "../../../Redux/Store";
// import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
// import { addCouponAction } from "../../../Redux/CompanyState";

// export default function GetCoupon() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const couponId = +(params.id || "");

//   const [coupon, setCoupon] = useState<CouponModel>(
//     store
//       .getState()
//       .companyReducer.coupons.find((coupon) => coupon.id === couponId) ||
//       {}
//   );

//   useEffect(() => {
//     if (!store.getState().authReducer.user.token) {
//       notify.error(ErrMsg.NO_TOKEN);
//       navigate("/login");
//     }
//     if (!coupon) {
//       getCouponFromServer();
//     }
//   }, []);

//   const getCouponFromServer = async () => {
//     await getCouponApi(couponId)
//     .then((res) => {
//         notify.success(SccMsg.COUPON_FETCH_ONE_SUCCESS);
//         store.dispatch(addCouponAction(res.data));
//         setCoupon(res.data);
//       })

//       .catch((error) => {
//         notify.error(error);
//         navigate("/coupons"); //TODO
//       });
//   };

//   return (
//     <div>
//       <h1>{coupon.name}</h1>
//       {/* <CouponInfoCard coupon={coupon} to={"/coupons/view/" + couponId} /> */}
//     </div>
//   );
// }

//export default GetCoupon;
