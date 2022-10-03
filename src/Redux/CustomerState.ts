import { CustomerModel } from "../Models/CustomerModel";
import { CouponModel } from "../Models/CouponModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CustomerState {
  public coupons: CouponModel[] = [];
  public customerCoupons: CouponModel[] = [];
  public customers: CustomerModel[] = [];
}

// Step 2 - Define all possible actions for your application state
export enum CustomerActionType {
  GetCustomers = "getCustomers",
  GetCoupons = "getCoupons",
  AddCustomer = "addCustomer",
  PurchaseCoupon = "purchaseCoupon",
  UpdateCustomer = "updateCustomer",
  DeleteCustomer = "deleteCustomer",
  ClearCustomers = "clearCustomers",
  GetCustomerCoupons = "getCustomerCoupons",
  ClearCoupons = "clearCoupons",
  ClearCustomerCoupons = "clearCustomerCoupons",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerAction {
  type: CustomerActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function purchaseCouponAction(couponId: number): CustomerAction {
  return {
    type: CustomerActionType.PurchaseCoupon,
    payload: couponId,
  };
}

export function addCustomerAction(customer: CustomerModel): CustomerAction {
  return {
    type: CustomerActionType.AddCustomer,
    payload: customer,
  };
}

export function updateCustomerAction(customer: CustomerModel): CustomerAction {
  return {
    type: CustomerActionType.UpdateCustomer,
    payload: customer,
  };
}

export function deleteCustomerAction(customerId: number): CustomerAction {
  return {
    type: CustomerActionType.DeleteCustomer,
    payload: customerId,
  };
}

export function clearCustomersAction(): CustomerAction {
  return {
    type: CustomerActionType.ClearCustomers,
    payload: {},
  };
}

export function clearCouponAction(): CustomerAction {
  return {
    type: CustomerActionType.ClearCoupons,
    payload: {},
  };
}

export function clearCustomerCouponAction(): CustomerAction {
    return {
      type: CustomerActionType.ClearCoupons,
      payload: {},
    };
  }

export function getCustomersAction(customers: CustomerModel[]): CustomerAction {
  return {
    type: CustomerActionType.GetCustomers,
    payload: customers,
  };
}

export function getCustomerCouponsAction(
  coupons: CouponModel[]
): CustomerAction {
  return {
    type: CustomerActionType.GetCustomerCoupons,
    payload: coupons,
  };
}

export function getCouponsAction(
  coupons: CouponModel[]
): CustomerAction {
  return {
    type: CustomerActionType.GetCoupons,
    payload: coupons,
  };
}

// Step 5 - Reducer function perform the required action

export function CustomerReducer(
  currentState: CustomerState = new CustomerState(),
  action: CustomerAction
): CustomerState {
  const newState = { ...currentState };

  switch (action.type) {
    case CustomerActionType.PurchaseCoupon: 
      const coupon = newState.coupons.find((coupon) => coupon.id === action.payload);
      newState.customerCoupons.push(coupon); // this alleviates the need to return the coupon from the server
      break;
    case CustomerActionType.GetCustomers:
      newState.customers = action.payload;
      break;
    case CustomerActionType.GetCustomerCoupons:
      newState.customerCoupons = action.payload; 
      break;
      case CustomerActionType.GetCoupons:
      newState.coupons = action.payload; 
      break;
    case CustomerActionType.DeleteCustomer:
      newState.customers = newState.customers.filter(
        (customer) => customer.id !== action.payload);
      break;
    case CustomerActionType.UpdateCustomer:
      const customerId = newState.customers.findIndex((customer) => {
        return customer.id === action.payload.id;
      });
      newState.customers[customerId] = action.payload;
      break;
    case CustomerActionType.AddCustomer:
      newState.customers.push(action.payload);
      break;
    case CustomerActionType.ClearCustomers:
      newState.customers = [];
      break;
    case CustomerActionType.ClearCoupons:
      newState.coupons = [];
      break;
      case CustomerActionType.ClearCustomerCoupons:
      newState.customerCoupons = [];
      break;
  }
  return newState;
}
