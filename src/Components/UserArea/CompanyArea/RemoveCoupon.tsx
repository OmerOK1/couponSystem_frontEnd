import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { removeCouponApi } from '../../../WebApi/CompanyApi';
import { ClientType } from '../../../Models/ClientType';
import { CouponModel } from '../../../Models/CouponModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { deleteCouponAction } from '../../../Redux/CompanyState';

function RemoveCoupon() {
    const requiredType = ClientType.COMPANY;
    const navigate = useNavigate();
    const params = useParams();
    const couponId= +(params.id || "");
    
    useEffect(()=>{ // test action is legal
        if (!store.getState().authReducer.user.token){
            notify.error(ErrMsg.NO_TOKEN);
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notify.error(ErrMsg.UNAUTHORIZED_ACTION);
            navigate("/login");
        }
    },[])
    
    const removeCoupon = async ()=> {
        await removeCouponApi(couponId).then((any)=>{
            notify.success(SccMsg.COUPON_DELETE_SUCCESS);
            store.dispatch(deleteCouponAction(couponId));
        })
        .catch ((error)=>{
            notify.error(error)
        })
        navigate("/company/coupons"); 
    }

    const cancelRemoveCoupon = ()=> {
        navigate("/company/coupons"); //TODO add last nav to state?
    }
    
    return (
        <div>
            <h2>Delete Coupon From Database</h2>
            <span>are you sure?</span>
            <button className="button-success" onClick={removeCoupon}>Delete Now</button>
            <button className="button-cancel" onClick={cancelRemoveCoupon}>return</button>
        </div>
    );
}

export default RemoveCoupon;