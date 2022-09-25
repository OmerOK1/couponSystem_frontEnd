import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import * as yup from "yup";
import { getAllCustomersApi, removeCustomerApi } from '../../../WebApi/AdminApi';
import { ClientType } from '../../../Models/ClientType';
import { CustomerModel } from '../../../Models/CustomerModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { getCustomersAction } from '../../../Redux/CustomerState';
import CustomLink from '../../SharedArea/CustomLink/CustomLink';
import { BsPencilSquare } from 'react-icons/bs';
import EmptyView from '../../SharedArea/EmptyView/EmptyView';
import CustomerCard from '../../SharedArea/Cards/CustomerCard/CustomerCard';

function GetAllCustomers() {
    const requiredType = ClientType.ADMINISTRATOR;
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().customerReducer.customers);
    
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
        if (customers.length <= 1) {
            getAllCustomers();
        }
    },[])
    
    const getAllCustomers = async ()=> {
        await getAllCustomersApi().then((res)=>{
            notify.success(SccMsg.CUSTOMERS_FETCH_SUCCESS);
            store.dispatch(getCustomersAction(res.data));
            setCustomers(res.data);
        })
        .catch ((error)=>{
            notify.error(error);
        })
    }
    

    return (
        <div className="customers_view_container">
            <h1>All Customers</h1>
            <CustomLink to="/customers/add">
                <BsPencilSquare size={25}/>Add Customer
            </CustomLink>
            <div className="customer_list_container">
                {
                    customers.length > 0 ?
                    (<div className="customers_gallery">
                        {customers.map((customer)=>(
                        <CustomerCard key={customer.id} customer={customer} to={"/customers"}/>
                        ))}
                    </div>) : 
                    (<div className="empty_view">
                        <EmptyView msg="no customers available"/>
                    </div>)
                }
            </div>
        </div>
    )}

export default GetAllCustomers;