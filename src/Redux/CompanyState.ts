import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CompanyState {
  public coupons: CouponModel[] = [];
  public companies: CompanyModel[] = [];
}

// Step 2 - Define all possible actions for your application state
export enum CompanyActionType {
  AddCompany = "addCompany",
  UpdateCompany = "updateCompany",
  DeleteCompany = "deleteCompany",
  AddCoupon = "addCoupon",
  UpdateCoupon = "updateCoupon",
  DeleteCoupon = "deleteCoupon",
  ClearCoupons = "clearCoupons",
  ClearCompanies = "clearCompanies",
  GetCompanies = "getCompanies",
  GetCompany = "getCompany",
  GetCoupon = "getCoupon",
  GetCompanyCoupons = "getCompanyCoupons",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompanyAction {
  type: CompanyActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action

export function addCompanyAction(company: CompanyModel): CompanyAction {
  return {
    type: CompanyActionType.AddCompany,
    payload: company,
  };
}

export function updateCompanyAction(company: CompanyModel): CompanyAction {
  return {
    type: CompanyActionType.UpdateCompany,
    payload: company,
  };
}

export function deleteCompanyAction(companyId: number): CompanyAction {
  return {
    type: CompanyActionType.DeleteCompany,
    payload: companyId,
  };
}

export function addCouponAction(coupon: CouponModel): CompanyAction {
  return {
    type: CompanyActionType.AddCoupon,
    payload: coupon,
  };
}

export function updateCouponAction(coupon: CouponModel): CompanyAction {
  return {
    type: CompanyActionType.UpdateCoupon,
    payload: coupon,
  };
}

export function deleteCouponAction(couponId: number): CompanyAction {
  return {

    
    type: CompanyActionType.DeleteCoupon,
    payload: couponId,
  };
}

export function clearCompaniesAction(): CompanyAction {
  return {
    type: CompanyActionType.ClearCompanies,
    payload: {},
  };
}

export function clearCouponAction(): CompanyAction {
  return {
    type: CompanyActionType.ClearCoupons,
    payload: {},
  };
}

export function getCompaniesAction(companies: CompanyModel[]): CompanyAction {
  return {
    type: CompanyActionType.GetCompanies,
    payload: companies,
  };
}

// export function getCouponAction(coupon: CouponModel): CompanyAction {
//   return {
//     type: CompanyActionType.GetCoupon,
//     payload: coupon // TODO: this is not implemented, used the add action instead
//   };
// }

// export function getCompanyAction(company: CompanyModel): CompanyAction {
//   return { 
//     type: CompanyActionType.GetCompany,
//     payload: company }; // TODO: this is not implemented
// }

export function getCompanyCouponsAction(coupons: CouponModel[]): CompanyAction {
  return {
    type: CompanyActionType.GetCompanyCoupons,
    payload: coupons,
  };
}

// Step 5 - Reducer function perform the required action

export function CompanyReducer(currentState: CompanyState = new CompanyState(),action: CompanyAction): CompanyState {
  const newState = { ...currentState };
  switch (action.type) {
    case CompanyActionType.GetCompanies: 
      newState.companies = action.payload;    
    break;
    case CompanyActionType.GetCompanyCoupons:
        newState.coupons = action.payload;
      break;
    case CompanyActionType.DeleteCoupon:
        newState.coupons = newState.coupons.filter((coupon)=>coupon.id !== action.payload);
      break;
    case CompanyActionType.DeleteCompany:
        newState.companies = newState.companies.filter((company)=> company.id !== action.payload);
      break;
    case CompanyActionType.UpdateCompany:
        const companyId = newState.companies.findIndex((company)=>{return company.id === action.payload.id})
        newState.companies[companyId] = action.payload;
      break;
    case CompanyActionType.UpdateCoupon:
        const couponId = newState.coupons.findIndex((coupon)=> coupon.id !== action.payload.id);
        newState.coupons[couponId] = action.payload;
      break;
    case CompanyActionType.AddCoupon:
        newState.coupons.push(action.payload);
      break;
    case CompanyActionType.AddCompany:
        newState.companies.push(action.payload);
      break;
    case CompanyActionType.ClearCompanies:
        newState.companies = [];
      break;
    case CompanyActionType.ClearCoupons:
        newState.coupons = [];
      break;
  }
  return newState;
}
