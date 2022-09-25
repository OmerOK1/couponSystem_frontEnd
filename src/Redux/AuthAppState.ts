// Step 1 - Create AppState and manage the collection once and in a centralize place

import { ClientType } from "../Models/ClientType";
import { LoginResponseModel } from "../Models/LoginResponseModel";


export class AuthAppState {
    public user: LoginResponseModel = new LoginResponseModel();
    
    public constructor() { 
    // for when you are already logged in and re-enter the website.
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '');
            if (storedUser) {
                this.user = storedUser;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

// Step 2 - Define ActionType using enum for all required operations
export enum AuthActionType {
    Login = "Login",
    Logout = "Logout"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // ? for logout
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action

/* export function registerAction(): AuthAction {
    return { type: AuthActionType.Register };
}
 */

export function loginAction(user: LoginResponseModel): AuthAction {
    return { type: AuthActionType.Login, payload: user };
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

// Step 5 - Reducer function perform the required action
export function AuthReducer(currentState: AuthAppState = new AuthAppState(),
    action: AuthAction): AuthAppState {

    const newState = { ...currentState } //Spread Operator
    switch (action.type) {
        case AuthActionType.Login: //Payload is a logged-in user from the server
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the local storage (won't be deleted)
            
            break;
        case AuthActionType.Logout: // No payload
            newState.user = new LoginResponseModel("","", -10, "", ClientType.NONE);
            localStorage.removeItem("user");
            break;

    }
    return newState;

}