import { Category } from "../Models/Category";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import globals from "../Services/globals";
import tokenAxios from "../Services/InterceptorAxios";


const companyUrl = globals.urls.company;

export async function addCouponApi(coupon: CouponModel) {
    return await tokenAxios.post<CouponModel>(companyUrl+"coupons", coupon);
}

export async function updateCouponApi(coupon: CouponModel, couponId: number) {
    return await tokenAxios.put<CouponModel>(companyUrl+"coupons/"+ couponId, coupon)
}
// TODO: add coupon to the return value on the service

export async function removeCouponApi(couponId: number) {
    return await tokenAxios.delete<any>(companyUrl+"coupons/"+couponId);
}

export async function getAllCompanyCouponsApi() {
    return await tokenAxios.get<CouponModel[]>(companyUrl+"coupons");
}

export async function getAllCouponsByCategoryApi(category: Category) {
    return await tokenAxios.get<CouponModel[]>(companyUrl+"coupons/category?category="+category);
}

export async function getAllCouponsPriceLessThan(price : number) {
    return await tokenAxios.get<CouponModel[]>(companyUrl+"coupons/price?price="+price);
}

export async function getCouponApi(couponId: number) {
    return await tokenAxios.get<CouponModel>(companyUrl+"coupons/"+couponId);
}

export async function getCompanyInfoApi() {
    return await tokenAxios.get<CompanyModel>(companyUrl+"info");
}