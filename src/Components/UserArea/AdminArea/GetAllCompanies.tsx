import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import * as yup from "yup";
import { getAllCompaniesApi, removeCompanyApi } from '../../../WebApi/AdminApi';
import { ClientType } from '../../../Models/ClientType';
import { CompanyModel } from '../../../Models/CompanyModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { clearCompaniesAction, deleteCompanyAction, getCompaniesAction } from '../../../Redux/CompanyState';
import CustomLink from '../../SharedArea/CustomLink/CustomLink';
import { BsPencilSquare } from 'react-icons/bs';
import CompanyCard from '../../SharedArea/Cards/CompanyCard/CompanyCard';
import EmptyView from '../../SharedArea/EmptyView/EmptyView';

function GetAllCompanies() {
    const requiredType = ClientType.ADMINISTRATOR;
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companyReducer.companies);

    useEffect(()=>{
        if (!store.getState().authReducer.user.token){
            notify.error(ErrMsg.NO_TOKEN);
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notify.error(ErrMsg.UNAUTHORIZED_ACTION);
            navigate("/login");
        } //TODO check
    },[]) 

    useEffect(() => {
        if (companies.length <= 1) { 
            getAllCompanies();
        }
    },[])
    
    const getAllCompanies = async ()=> {
        await getAllCompaniesApi().then((res)=>{
            notify.success(SccMsg.COMPANIES_FETCH_SUCCESS);
            store.dispatch(getCompaniesAction(res.data));
            setCompanies(res.data);
        })
        .catch ((error)=>{
            notify.error(error);
        })
    }
    

    return (
        <div className="companies_view_container">
            <h1>All Companies</h1>
            <CustomLink to="/companies/add">
                <BsPencilSquare size={25}/>Add Company
            </CustomLink>
            <div className="company_list_container">
                {
                    companies.length > 0 ?
                    (<div className="companies_gallery">
                        {companies.map((company)=>(
                        <CompanyCard key={company.id} company={company} to={"/companies"}/>
                        ))}
                    </div>) : 
                    (<div className="empty_view">
                        <EmptyView msg="no companies available"/>
                    </div>)
                }
            </div>
        </div>
    )}

export default GetAllCompanies;