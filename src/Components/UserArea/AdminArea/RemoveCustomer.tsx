import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { removeCustomerApi } from '../../../WebApi/AdminApi';
import { ClientType } from '../../../Models/ClientType';
import { CustomerModel } from '../../../Models/CustomerModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { deleteCustomerAction } from '../../../Redux/CustomerState';

function RemoveCustomer() {
    const requiredType = ClientType.ADMINISTRATOR;
    const navigate = useNavigate();
    const params = useParams();
    const customerId= +(params.id || "");
    
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
    
    const removeCustomer = async ()=> {
        await removeCustomerApi(customerId).then((any)=>{
            notify.success(SccMsg.CUSTOMER_DELETE_SUCCESS);
            store.dispatch(deleteCustomerAction(customerId));
        })
        .catch ((error)=>{
            notify.error(error)
        })
        navigate("/customers"); //TODO: create and use navigation enum type for all navigation
    }

    const cancelRemoveCustomer = ()=> {
        navigate("/customers");
    }
    
    return (
        <div>
            <h2>Delete Customer From Database</h2>
            <span>are you sure?</span>
            <button className="button-success" onClick={removeCustomer}>Delete Now</button>
            <button className="button-cancel" onClick={cancelRemoveCustomer}>return</button>
        </div>
    );
}

export default RemoveCustomer;