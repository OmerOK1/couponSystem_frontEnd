import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import * as yup from "yup";
import { getAllCompanyCouponsApi, getCompanyInfoApi, removeCouponApi } from '../../../WebApi/CompanyApi';
import { ClientType } from '../../../Models/ClientType';
import { CouponModel } from '../../../Models/CouponModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { addCompanyAction, getCompanyCouponsAction } from '../../../Redux/CompanyState';
import CustomLink from '../../SharedArea/CustomLink/CustomLink';
import { BsPencilSquare } from 'react-icons/bs';
import EmptyView from '../../SharedArea/EmptyView/EmptyView';
import CouponCard from '../../SharedArea/Cards/CouponCard/CouponCard';
import { CompanyModel } from '../../../Models/CompanyModel';
import { Category } from '../../../Models/Category';

function GetAllCompanyCoupons() {
    const requiredType = ClientType.COMPANY;
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);

    console.log(store.getState().companyReducer.coupons);
    console.log(coupons);

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

    useEffect(() => {
        if (coupons.length <= 0) {
            getAllCompanyCoupons();
        }
    },[])
    
    const getAllCompanyCoupons = async ()=> {
        await getAllCompanyCouponsApi().then((res)=>{
            notify.success(SccMsg.COUPONS_FETCH_SUCCESS);
            store.dispatch(getCompanyCouponsAction(res.data));
            setCoupons(res.data);
        })
        .catch ((error)=>{
            notify.error(error);
        })
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>)=> {
        const category = e.currentTarget.value;
        console.log("category: ", category);
        if (category === "ALL") {
            setCoupons(store.getState().companyReducer.coupons);
        }else {
            setCoupons(store.getState().companyReducer.coupons.filter(
                (coupon)=>{return coupon.category.valueOf() === category}));
        }
    }

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const maxPrice = Number(e.currentTarget.value);
        console.log("maxprice: ", maxPrice);
        if (maxPrice === 0) {
            setCoupons(store.getState().companyReducer.coupons);
        }else {
            setCoupons(store.getState().companyReducer.coupons.filter(
                (coupon)=>{return coupon.price <= maxPrice}));
        }
    }
    

    return (
        <div className="coupons_view_container">
            <h1>All Coupons</h1>
            <CustomLink to="/company/coupon/add">
                <BsPencilSquare size={25}/>Add Coupon
            </CustomLink>
            <label htmlFor="category"></label>
                <select name='category' placeholder="category" onChange={(e)=>handleCategoryChange(e)} defaultValue="ALL" id="category"> 
                <option key="ALL" value="ALL">All</option>
                {Object.keys(Category).map((key, index) => (
                <option
                aria-selected="true"
                key={key}
                value={key}
                >{Object.values(Category)[index]}
                </option>
                ))}
                </select>
                <label htmlFor="price">Coupon Price</label>
                <input type="number" min={0} max={999_999} step={1} defaultValue={0} onChange={(e)=>handleMaxPriceChange(e)} id="price" name='price'/>
            <div className="coupon_list_container">
                {
                    coupons.length > 0 ?
                    (<div className="coupons_gallery">
                        {coupons.map((coupon, index)=>(
                         <CouponCard key={index} coupon={coupon} to={"/coupons"}/>
                        ))}
                    </div>) : 
                    (<div className="empty_view">
                        <EmptyView msg="no coupons available"/>
                    </div>)
                }
            </div>
        </div>
    )}

export default GetAllCompanyCoupons;