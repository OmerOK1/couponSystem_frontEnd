import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { addCouponApi, getCouponApi, updateCouponApi } from "../../../WebApi/CompanyApi";
import { ClientType } from "../../../Models/ClientType";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import {
  addCouponAction,
  updateCouponAction,
} from "../../../Redux/CompanyState";
import { Category } from "../../../Models/Category";

function UpdateCoupon() {
  const requiredType = ClientType.COMPANY;
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +params.id;
  const [inTimeout, setInTimeout] = useState(false);

  const [coupon, setCoupon] = useState(
    store
      .getState()
      .companyReducer.coupons.find((coupon) => coupon.id === couponId)
  );

  const getCouponFromServer = async () => {
    await getCouponApi(couponId)
    .then((res) => {
        notify.success(SccMsg.COUPON_FETCH_ONE_SUCCESS);
        store.dispatch(addCouponAction(res.data));
        setCoupon(res.data);
      })

      .catch((error) => {
        console.log(error);
        notify.error(error);
        navigate("/coupons"); //TODO
      });
  };
  (function () {
    if (coupon === undefined) {
      getCouponFromServer();
    }
  })();

  const schema = yup.object().shape({
    name: 
        yup.string().lowercase().required("title required"),
        category:yup.string().required("category required"),
        description:yup.string().lowercase().required("description required"),
        startDate:yup.date()
        .min(new Date(Date.now()-86400_000), "start date in the past")
        .typeError("must specify a starting date")
        .required("must specify a starting date"),
        endDate:yup.date().
            min(
                yup.ref('startDate'),
                "end date can't be before start date"
              )
            .required("end date required")
            .nullable().default(()=>new Date(Date.now()+6.048e+8))
            .typeError("must specify an expiration date"),
        amount:yup.number().integer().min(1).required("amount required"),
        price:yup.number().min(0).required("price required"),
        img:yup.string(),
        companyId:yup.number()
});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({
    defaultValues: { ...coupon },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { dirtyFields } = useFormState({ control });

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

  const updateCoupon = async (coupon: CouponModel) => {
    if (inTimeout) {return;}
    setInTimeout(true);
    await updateCouponApi(coupon, couponId)
      .then((res) => {
        notify.success(SccMsg.COUPON_UPDATE_SUCCESS);
        store.dispatch(updateCouponAction(res.data));
        navigate("/coupons");
      })
      .catch((error) => {
        notify.error(error);
      });
      setTimeout(() => setInTimeout(false), 3000);    
  };

  return (
    <>
      {coupon && (
        <div>
          <h1>edit {coupon.name} coupon</h1>
            {/* Step 9 - handleSubmit your form  */}

            <form onSubmit={handleSubmit(updateCoupon)} className="add_coupon_form flex-center-col">
                {/* <input {...register("company")} hidden value={}/> */}
                <input {...register("id")} hidden value={1}/>
                <label htmlFor="name">title</label>
                <input {...register("name")} name="name" type="text" placeholder= "coupon title" id="name" />
                <span className="validation_rules">{errors.name?.message}</span>
                <br />

                <label htmlFor="category">Category</label>
                <select name='category' {...register("category")} placeholder="category" defaultValue="" id="category"> 
                <option value="" disabled>Category</option>
                {Object.keys(Category).map((key, index) => (
                <option
                aria-selected="true"
                key={key}
                value={key}
                >{Object.values(Category)[index]}
                </option>
                ))}
                </select>
                <span className="validation_rules">{errors.category?.message}</span>
                <br />

                <label htmlFor="description">Description</label>
                <input {...register("description")} type="text" placeholder= "description" id="description" name='description'/>
                <span className="validation_rules">{errors.description?.message}</span>
                <br />

                <label htmlFor="startDate">Beginning at</label>
                <input {...register("startDate")} type="date" id="startDate" name='startDate'/>
                <span className="validation_rules">{errors.startDate?.message}</span>
                <br />

                <label htmlFor="endDate">Ending at</label>
                <input {...register("endDate")} type="date" id="endDate" name='endDate'/>
                {/* TODO add minimum */}
                <span className="validation_rules">{errors.endDate?.message}</span>
                <br />


                <label htmlFor="amount">Coupon Amount</label>
                <input {...register("amount")} type="number" min={1} placeholder= "amount" id="amount" name='amount'/>
                <span className="validation_rules">{errors.amount?.message}</span>
                <br />

                <label htmlFor="price">Coupon Price</label>
                <input {...register("price")} type="number" min={0} step={0.01} pattern="^\d+(?:\.\d{1,2})?$" placeholder="price" id="price" name='price'/>
                <span className="validation_rules">{errors.price?.message}</span>
                <br />

                <label htmlFor="img">Image</label>
                <input {...register("img")} type="text" placeholder= "img" id="img" name='img'/>
                <span className="validation_rules">{errors.img?.message}</span>
                <br />

                <button className="button-success" disabled={!isValid}>Create Now</button>
            </form>
        </div>
      )}
    </>
  );
}

export default UpdateCoupon;
