import { LoginRequestModel } from "../Models/LoginRequestModel";
import { LoginResponseModel } from "../Models/LoginResponseModel";
import axios from "axios";
import globals from "../Services/globals";

export async function loginApi(request : LoginRequestModel) {
    return await axios.post<LoginResponseModel>(globals.urls.login, request);
}