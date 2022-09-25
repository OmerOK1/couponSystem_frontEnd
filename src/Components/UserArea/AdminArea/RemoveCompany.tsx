import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { removeCompanyApi } from '../../../WebApi/AdminApi';
import { ClientType } from '../../../Models/ClientType';
import { CompanyModel } from '../../../Models/CompanyModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { deleteCompanyAction } from '../../../Redux/CompanyState';

function RemoveCompany() {
    const requiredType = ClientType.ADMINISTRATOR;
    const navigate = useNavigate();
    const params = useParams();
    const companyId= +(params.id || "");
    
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
    
    const removeCompany = async ()=> {
        await removeCompanyApi(companyId).then((any)=>{
            notify.success(SccMsg.COMPANY_DELETE_SUCCESS);
            store.dispatch(deleteCompanyAction(companyId));
        })
        .catch ((error)=>{
            notify.error(error)
        })
        navigate("/companies"); //TODO: create and use navigation enum type for all navigation
    }

    const cancelRemoveCompany = ()=> {
        navigate("/companies");
    }
    
    return (
        <div>
            <h2>Delete Company From Database</h2>
            <span>are you sure?</span>
            <button className="button-success" onClick={removeCompany}>Delete Now</button>
            <button className="button-cancel" onClick={cancelRemoveCompany}>return</button>
        </div>
    );
}

export default RemoveCompany;