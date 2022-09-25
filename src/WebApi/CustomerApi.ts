import axios from "axios";
import { Category } from "../Models/Category";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";

const customerUrl = globals.urls.customer;

export async function getAllCouponsByCategoryApi(category: Category) {
  return await tokenAxios.get<CouponModel[]>(customerUrl + "coupons/category", {params: { category: category }});
}

export async function getAllCouponsPriceLessThan(price: number) :Promise<any>{ // TODO: promise
  return await tokenAxios.get<CouponModel[]>(
    customerUrl + "coupons/price?price=" + price);
}

export async function getCustomerInfoApi() {
  return await tokenAxios.get<CustomerModel>(customerUrl + "info");
}

export async function purchaseCouponApi(couponId: number) {
  return await tokenAxios.put<CouponModel>(customerUrl + "coupons/" + couponId);
}

export async function getAllCouponsApi() {
  return await tokenAxios.get<CouponModel[]>(customerUrl + "coupons/all");
}

export async function getAllCustomerCouponsApi() {
  return await tokenAxios.get<CustomerModel[]>(customerUrl + "coupons");
}