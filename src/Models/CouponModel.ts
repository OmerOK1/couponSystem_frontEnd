import { Category } from "./Category";
import { CompanyModel } from "./CompanyModel";

export class CouponModel{
    public id?: number;
    public name?: string;
    public category?: Category;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public amount?: number;
    public price?: number;
    public img?: string;
    public company?: CompanyModel;  //TODO: create DTO and use number instead

   

    public constructor(id?: number, name?: string, category?: Category, description?: string, startDate?: Date, endDate?: Date, amount?: number, price?: number, img?: string, company?: CompanyModel) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.img = img;
        this.company = company;
    }

    
}