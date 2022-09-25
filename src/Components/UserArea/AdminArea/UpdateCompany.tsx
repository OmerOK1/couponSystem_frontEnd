import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFormState} from 'react-hook-form'
import * as yup from "yup";
import { addCompanyApi, getCompanyApi, updateCompanyApi } from '../../../WebApi/AdminApi';
import { ClientType } from '../../../Models/ClientType';
import { CompanyModel } from '../../../Models/CompanyModel';
import store from '../../../Redux/Store';
import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
import { addCompanyAction, updateCompanyAction } from '../../../Redux/CompanyState';


function UpdateCompany() {
    const requiredType = ClientType.ADMINISTRATOR;
    const navigate = useNavigate();
    const params = useParams();
    const companyId = +(params.id);
    const [inTimeout, setInTimeout] = useState(false);

    const [company, setCompany] = useState(
        store.getState().companyReducer.companies.find
        (company => company.id === companyId));

    const getOriginalCompanyFromServer = async () => {
        await getCompanyApi(companyId)
        .then((res) => {
            notify.success(SccMsg.COMPANY_FETCH_ONE_SUCCESS);
            store.dispatch(addCompanyAction(res.data));
            setCompany(res.data);
          })
    
          .catch((error) => {
            notify.error(error);
            navigate("/companies"); //TODO
          });
      };
      (function () {
        if (company === undefined) {
          getOriginalCompanyFromServer();
        }
      })();
    
    const schema = yup.object().shape({
        name: yup.string().required("illegal changes"),
        email:
            yup.string().lowercase()
                .required("please enter the company's email address")
                .matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "just enter a real email, we don't really know how this works. thanks."),
        password: 
            yup.string()
                .required("Password is required")
                .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, "must contain at least one uppercase letter, one lowercase letter, and one digit (0-9), 8-20 characters long, thank you! :)")
    })

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<CompanyModel>({defaultValues : {...company}, mode: "all", resolver: yupResolver(schema) });

    const {dirtyFields} = useFormState({ control });

    useEffect(()=>{
        if (!store.getState().authReducer.user.token){
            notify.error(ErrMsg.NO_TOKEN);
            navigate("/login");
        }
        if (!(store.getState().authReducer.user.clientType === requiredType)){
            notify.error(ErrMsg.UNAUTHORIZED_ACTION);
            navigate("/login");
        }
        if (companyId === 0) {
            notify.error(ErrMsg.ERROR_NOT_FOUND);
            navigate("/login");
        }
    },[])
    
    const updateCompany = async (company: CompanyModel)=> {
        if (inTimeout) {return;}
        setInTimeout(true);

        await updateCompanyApi(company, companyId).then((res)=>{
            notify.success(SccMsg.COMPANY_UPDATE_SUCCESS);
            store.dispatch(updateCompanyAction(res.data));
            navigate("/companies");
        })
        .catch ((error)=>{
            notify.error(error)
        })
        setInTimeout(false);
    }
    

    return (
        
        <>
        {company && (
        <div>
        
            <h1>Edit {company.name}</h1>
            {/* Step 9 - handleSubmit your form  */}

            <form onSubmit={handleSubmit(updateCompany)} className="add_company_form flex-center-col">
                <label htmlFor="id" >id number</label>
                <input disabled={true} type="number" name="id" id="id" placeholder={""+company.id} {...register("id")} />
                <br /> 

                <label htmlFor="name" >Name</label>
                <input disabled={true} {...register("name")} type="name" id="name" placeholder={company.name} />
                <span className="validation_rules">{errors.name?.message}</span>
                <br />

                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" placeholder="email" id="email" value={company.email} />
                <span className="validation_rules">{errors.email?.message}</span>
                <br />

                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password"  value={company.password} />
                <span className="validation_rules">{errors.password?.message}</span>
                <br />

                <button className="button-success" disabled={!isDirty}>Apply Changes
                </button>
            </form>
        </div>)}
        </>
    );
    
}

export default UpdateCompany;