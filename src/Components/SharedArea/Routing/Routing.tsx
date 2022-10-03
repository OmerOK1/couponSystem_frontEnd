import { Route, Routes } from "react-router-dom";
import App from "../../../App";
//import Main from "../../LayoutArea/Main/Main";
import About from "../../PagesArea/About/About";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../Page404/Page404";

import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import GetAllCompanies from "../../UserArea/AdminArea/GetAllCompanies";
import AddCompany from "../../UserArea/AdminArea/AddCompany";
import RemoveCompany from "../../UserArea/AdminArea/RemoveCompany";
import UpdateCompany from "../../UserArea/AdminArea/UpdateCompany";
import GetCompany from "../../UserArea/AdminArea/GetCompany";
import GetAllCustomers from "../../UserArea/AdminArea/GetAllCustomers";
import GetCustomer from "../../UserArea/AdminArea/GetCustomer";
import AddCustomer from "../../UserArea/AdminArea/AddCustomer";
import UpdateCustomer from "../../UserArea/AdminArea/UpdateCustomer";
import RemoveCustomer from "../../UserArea/AdminArea/RemoveCustomer";
import AddCoupon from "../../UserArea/CompanyArea/AddCoupon";
// import GetCoupon from "../../UserArea/CompanyArea/GetCoupon";
import UpdateCoupon from "../../UserArea/CompanyArea/UpdateCoupon";
import GetAllCompanyCoupons from "../../UserArea/CompanyArea/GetAllCompanyCoupons";
import GetCompanyInfo from "../../UserArea/CompanyArea/GetCompanyInfo";
import RemoveCoupon from "../../UserArea/CompanyArea/RemoveCoupon";
import GetCustomerInfo from "../../UserArea/CustomerArea/GetCustomerInfo";
import GetAllCoupons from "../../UserArea/CustomerArea/GetAllCoupons";
import PurchaseCoupon from "../../UserArea/CustomerArea/PurchaseCoupon";
import GetAllCustomerCoupons from "../../UserArea/CustomerArea/GetAllCustomerCoupons";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* // Admin --------------------------------------------------------------- */}
            
                <Route path="/companies" element={<GetAllCompanies />} />
                <Route path="/companies/view/:id" element={<GetCompany />} />
                <Route path="/companies/add" element={<AddCompany />} />
                <Route path="/companies/update/:id" element={<UpdateCompany />} />
                <Route path="/companies/remove/:id" element={<RemoveCompany />} /> 

                <Route path="/customers" element={<GetAllCustomers />} />
                <Route path="/customers/view/:id" element={<GetCustomer />} />
                <Route path="/customers/add" element={<AddCustomer />} />
                <Route path="/customers/update/:id" element={<UpdateCustomer />} />
                <Route path="/customers/remove/:id" element={<RemoveCustomer />} />
                {/* // Admin/
                // Company ---------------------------------------------------------------- */}

                <Route path="/company/coupons" element={<GetAllCompanyCoupons/>} /> 
                <Route path="/company/coupon/add" element={<AddCoupon/>} />
                <Route path="/company/coupon/update/:id" element={<UpdateCoupon/>} />
                <Route path="/company/coupon/delete/:id" element={<RemoveCoupon/>} />
                <Route path="/company/view" element={<GetCompanyInfo/>} /> 
                
                
                {/* //Company/
                //customer ---------------------------------------------------------------- */}
                <Route path="/customer/view" element={<GetCustomerInfo/>} /> 
                <Route path="/customer/coupons" element={<GetAllCoupons/>} /> 
                <Route path="/customer/coupons/owned" element={<GetAllCustomerCoupons/>} /> 




                {/* //Customer / ----------------------------------------------------------------
                //Authentication/ ---------------------------------------------------------------- */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/*" element={<Page404 />} />

            </Routes>
        </div>
    );
}

export default Routing;
