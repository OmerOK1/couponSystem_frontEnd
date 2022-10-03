import { CustomerModel } from "../Models/CustomerModel";
import { CompanyModel } from "../Models/CompanyModel";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";

const adminUrl = globals.urls.admin;

export async function addCompanyApi(company: CompanyModel) {
    return await tokenAxios.post<CompanyModel>(adminUrl+"companies", company)
}

export async function removeCompanyApi(companyId: number) {
    return await tokenAxios.delete<any>(adminUrl+"companies/"+companyId);
}

export async function getAllCompaniesApi() {
    return await tokenAxios.get<CompanyModel[]>(adminUrl+"companies");
}

export async function getCompanyApi(companyId: number) {
    return await tokenAxios.get<CompanyModel>(adminUrl+"companies/"+companyId);
}

export async function updateCompanyApi(company: CompanyModel, companyId: number) {
    return await tokenAxios.put<CompanyModel>(adminUrl+"companies/"+companyId, company);
}

// customers

export async function addCustomerApi(customer: CustomerModel) {
    return await tokenAxios.post<CustomerModel>(adminUrl+"customers", customer)
}

export async function removeCustomerApi(customerId: number) {
    return await tokenAxios.delete<any>(adminUrl+"customers/"+customerId);
}

export async function getAllCustomersApi() {
    return await tokenAxios.get<CustomerModel[]>(adminUrl+"customers");
}

export async function getCustomerApi(customerId: number) {
    return await tokenAxios.get<CustomerModel>(adminUrl+"customers/"+customerId);
}

export async function updateCustomerApi(customer: CustomerModel, customerId: number) {
    return await tokenAxios.put<CustomerModel>(adminUrl+"customers/"+customerId, customer);
}