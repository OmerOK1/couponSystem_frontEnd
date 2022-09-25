import { ClientType } from './ClientType';

export class LoginResponseModel {
    public token?: string;
    public name?: String;
    public id?: number;
    public email?: string;
    public clientType: ClientType;

    public constructor(token?: string, email?: string, id?: number, name?: String, clientType?: ClientType) {
        this.token = token;
        this.email = email;
        this.clientType = clientType;
        this.id = id;
        this.name = name;
    }
}