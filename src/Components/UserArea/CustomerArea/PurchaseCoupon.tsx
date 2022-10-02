import React from 'react';
import { purchaseCouponAction } from '../../../Redux/CustomerState';
import store from '../../../Redux/Store';
import notify, { SccMsg } from '../../../Services/Notification';
import { purchaseCouponApi } from '../../../WebApi/CustomerApi';

async function PurchaseCoupon(id: number) {
    console.log('PurchaseCoupon');
    await purchaseCouponApi(id).then(() => {
        notify.success(SccMsg.COUPON_PURCHASE_SUCCESS);
        store.dispatch(purchaseCouponAction(id));
    })
    .catch((error) => {
        notify.error(error);
    })

}

export default PurchaseCoupon;